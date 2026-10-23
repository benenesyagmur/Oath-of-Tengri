/**
 * Selectively link a few named IL2CPP methods to native GameAssembly addresses.
 *
 * This research-only utility reads the original metadata and GameAssembly bytes
 * without loading or modifying either. It reuses REA's public source-level
 * metadata parser and PE/IL2CPP registration logic, but emits only requested
 * rows, avoiding the complete-report size limit.
 *
 * Run with the checked-out REA's local tsx loader:
 *   node <rea-root>/node_modules/tsx/dist/cli.mjs <this-file>
 */
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const researchRoot = resolve(here, "..");
const gameRoot = "B:\\Steam\\steamapps\\common\\Vampire Survivors";
const reaRoot =
  "C:\\Users\\benen\\Documents\\Codex\\2026-10-22\\https-github-com-morluto-rea-https\\work\\rea";
const metadataPath = join(
  gameRoot,
  "VampireSurvivors_Data",
  "il2cpp_data",
  "Metadata",
  "global-metadata.dat",
);
const binaryPath = join(gameRoot, "GameAssembly.dll");
const outputPath = join(
  researchRoot,
  "05-research-evidence",
  "artifacts",
  "native-selective-linkage-20261023.json",
);

type Target = Readonly<{
  system: "player" | "xp-level" | "weapon" | "enemy" | "pickup";
  namespace: string;
  type: string;
  method: string;
}>;

// Exact metadata names, chosen from the metadata-only evidence export.
const targets: readonly Target[] = [
  {
    system: "player",
    namespace: "VampireSurvivors.Objects.Characters",
    type: "CharacterController",
    method: "ProcessMovementVector",
  },
  {
    system: "xp-level",
    namespace: "VampireSurvivors.Objects.Characters",
    type: "CharacterController",
    method: "AddXp",
  },
  {
    system: "xp-level",
    namespace: "VampireSurvivors.Objects.Characters",
    type: "CharacterController",
    method: "LevelUp",
  },
  {
    system: "weapon",
    namespace: "VampireSurvivors.Objects.Weapons",
    type: "Weapon",
    method: "CalculateTotalDamage",
  },
  {
    system: "weapon",
    namespace: "VampireSurvivors.Objects.Weapons",
    type: "Weapon",
    method: "FireOneProjectile",
  },
  {
    system: "enemy",
    namespace: "VampireSurvivors.Objects.Characters",
    type: "EnemyController",
    method: "TargetClosestPlayer",
  },
  {
    system: "enemy",
    namespace: "VampireSurvivors.Objects.Characters",
    type: "EnemyController",
    method: "GetDamaged",
  },
  {
    system: "enemy",
    namespace: "VampireSurvivors.Objects.Characters",
    type: "EnemyController",
    method: "Die",
  },
  {
    system: "pickup",
    namespace: "VampireSurvivors.Objects.Pickups",
    type: "Pickup",
    method: "CanCharacterCollectPickup",
  },
  {
    system: "pickup",
    namespace: "VampireSurvivors.Objects.Pickups",
    type: "PickupManager",
    method: "CreatePickup",
  },
] as const;

const sha256 = (bytes: Buffer) =>
  createHash("sha256").update(bytes).digest("hex");

const consume = <T>(steps: Generator<void, T>): T => {
  for (;;) {
    const next = steps.next();
    if (next.done) return next.value;
  }
};

const source = (relative: string) =>
  pathToFileURL(join(reaRoot, "src", relative)).href;

const metadataReader = await import(source("il2cpp/Il2cppMetadataFile.ts"));
const imageReader = await import(source("il2cpp/Il2cppBinaryImage.ts"));
const registrationReader = await import(
  source("il2cpp/Il2cppBinaryRegistration.ts"),
);

const metadataBytes = await readFile(metadataPath);
const binaryBytes = await readFile(binaryPath);
const parsed = metadataReader.readIl2cppMetadataForLinking(metadataBytes);
const image = consume(imageReader.openImageSteps(binaryBytes, undefined));
const modules = consume(registrationReader.findModules(image, parsed.metadata));
const registration = consume(
  registrationReader.findCodeRegistration(image, modules),
);

const imageForType = (typeIndex: number) => {
  const matches = parsed.metadata.images
    .map((item, index) => ({ item, index }))
    .filter(
      ({ item }) =>
        typeIndex >= item.type_start &&
        typeIndex < item.type_start + item.type_count,
    );
  if (matches.length !== 1)
    throw new Error(
      `Expected one metadata image for type index ${typeIndex}, found ${matches.length}.`,
    );
  return matches[0]!.index;
};

const selected = targets.map((target) => {
  const typeMatches = parsed.metadata.types
    .map((item, index) => ({ item, index }))
    .filter(
      ({ item }) => item.namespace === target.namespace && item.name === target.type,
    );
  if (typeMatches.length !== 1)
    throw new Error(
      `Expected one type ${target.namespace}.${target.type}, found ${typeMatches.length}.`,
    );
  const type = typeMatches[0]!;
  const methodMatches = parsed.metadata.methods
    .map((item, index) => ({ item, index }))
    .filter(
      ({ item, index }) =>
        index >= type.item.method_start &&
        index < type.item.method_start + type.item.method_count &&
        item.name === target.method,
    );
  if (methodMatches.length !== 1)
    throw new Error(
      `Expected one method ${target.namespace}.${target.type}.${target.method}, found ${methodMatches.length}.`,
    );
  const method = methodMatches[0]!;
  const imageIndex = imageForType(type.index);
  const module = modules[imageIndex];
  if (module === undefined)
    throw new Error(`No code-generation module for image index ${imageIndex}.`);
  const token = parsed.link.methodTokens[method.index]!;
  const row = token & 0x00ff_ffff;
  if (token >>> 24 !== 0x06 || row === 0 || row > module.method_pointer_count)
    throw new Error(
      `Invalid method token 0x${token.toString(16)} for ${target.type}.${target.method}.`,
    );
  const slot = module.method_pointers + BigInt((row - 1) * 8);
  const pointed = imageReader.readSlot(image, slot);
  const mapping =
    pointed === 0n
      ? { state: "no-body", address: null, rva: null }
      : pointed === "unknown" || pointed === null || pointed === undefined
        ? { state: "unknown", address: null, rva: null }
        : imageReader.isExecutable(image, pointed)
          ? {
              state: "code",
              address: `0x${pointed.toString(16)}`,
              rva: `0x${(pointed - image.imageBase).toString(16)}`,
            }
          : { state: "unknown", address: null, rva: null };
  return {
    ...target,
    metadata_type_index: type.index,
    metadata_method_index: method.index,
    metadata_method_token: `0x${token.toString(16)}`,
    metadata_image_index: imageIndex,
    metadata_image_name: parsed.metadata.images[imageIndex]!.name,
    module_record_address: `0x${module.address.toString(16)}`,
    method_pointer_array_address: `0x${module.method_pointers.toString(16)}`,
    method_pointer_slot_address: `0x${slot.toString(16)}`,
    ...mapping,
  };
});

const result = {
  schema: "vs-research.native-selective-il2cpp-linkage.v1",
  generated_at_utc: new Date().toISOString(),
  method: "Static file parsing only; no target execution, no Ghidra import, and no writes outside this output.",
  inputs: {
    metadata: {
      path: metadataPath,
      bytes: metadataBytes.length,
      sha256: sha256(metadataBytes),
      metadata_version: parsed.metadata.metadata_version,
    },
    binary: {
      path: binaryPath,
      bytes: binaryBytes.length,
      sha256: sha256(binaryBytes),
      format: image.container.format,
      architecture: image.container.architecture,
      image_base: `0x${image.imageBase.toString(16)}`,
    },
    rea_source: {
      root: reaRoot,
      files: [
        "src/il2cpp/Il2cppMetadataFile.ts",
        "src/il2cpp/Il2cppBinaryImage.ts",
        "src/il2cpp/Il2cppBinaryRegistration.ts",
      ],
    },
  },
  linkage: {
    code_gen_modules_field: `0x${registration.field.toString(16)}`,
    code_gen_modules_array: `0x${registration.array.toString(16)}`,
    code_gen_modules_count: modules.length,
  },
  selection: selected,
  limitations: [
    "Addresses are static file observations/derived structural associations, not runtime execution evidence.",
    "The caller selected this metadata/binary pair; structural module-name/count/token agreement is not a cryptographic same-build proof.",
    "Only the ten exact methods above are emitted. Generic instances, adjustor thunks, invokers, and unselected methods are outside this output.",
    "A code state identifies a nonzero method-pointer slot in an executable mapped range; it does not establish function boundaries or decompiler correctness.",
    "This tool intentionally does not calculate the full method-address or type-reference tables, avoiding REA's complete-report size limit.",
  ],
};

await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, selected: result.selection }, null, 2));
