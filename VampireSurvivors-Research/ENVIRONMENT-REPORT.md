# Ortam Raporu

## Hedef

- **Yerel kurulum:** `B:\Steam\steamapps\common\Vampire Survivors`
- **İnceleme tarzı:** salt-okunur; oyun varlıklarına, yürütülebilirlerine veya korumalarına müdahale edilmedi.

## Doğrulanmış teknik yüzey

- `VampireSurvivors.exe`, `UnityPlayer.dll`, `GameAssembly.dll`, `baselib.dll` ve `VampireSurvivors_Data` mevcut.
- `GameAssembly.dll` REA tarafından x86-64 PE olarak tanımlandı.
- `global-metadata.dat` mevcut; desktop taraması bunu IL2CPP işareti olarak kullandı.
- `boot.config`: `gfx-enable-gfx-jobs=1`, `gfx-threading-mode=6`, `gc-max-time-slice=3`; bunlar yapılandırma satırlarıdır, tek başına gözlenen performans davranışı değildir.

## Araçlar

- REA 6.7.0: masaüstü taraması ve dosya/metadata kimliği kullanılabilir.
- Ghidra sağlayıcısı bu REA oturumunda `not_configured` durumunda; yerel Ghidra12.1.4 headless importu başarılı, genel auto-analysis600 saniyede zaman aşımına uğradı. ReadOnly nedeniyle DB saklanmadı. Loglar araştırmada; Ghidra kendi AppData cache'ine de yazdı, oyun girdisine yazmadı.
- Bilgisayar-kullanımı aracı başlangıçta açık uygulama penceresi döndürmedi. Başlatma ya da girdi enjeksiyonu yapılmadı.

Ayrıntılı kanıtlar: [kanıt dizini](05-research-evidence/evidence-index.md).

## Devam oturumunda doğrulananlar

- REA metadata-only export başarılı, sürüm31.10 seçili metot için bağımsız REA kaynak okuyucu scripti native adres üretti.
- Unity serialized dosya başlığı sürümü6000.0.62f1.
- Bundled Python `C:\Users\benen\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe`; UnityPy1.25.4/JSON5 0.17.3 bağımlılıkları yalnızca araştırmanın `.tools/python` dizininde.
- Windows `@oai/sky` pencere envanteri çalıştı; hedef oyun penceresi görünmedi. Bu nedenle başka uygulamaların ekranları alınmadı.
