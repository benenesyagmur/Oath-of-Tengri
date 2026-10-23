# Loot ve sahne loot-tablosu kayıtları

> Durum: **Doğrulanmış (JSON değerleri)** / **Erişilemedi (olasılık algoritması)**.
> Buradaki `rarity` sayıları, bir ağırlık veya yüzde olarak yorumlanmamıştır;
> veri dosyasındaki ham alan değerleridir.

## Kanıt

- **Kanıt kimliği:** `EV-DATA-006`
- **Envanter/provenance:**
  [`inventory.json`](../05-research-evidence/artifacts/unity-data/inventory.json)
- **Sahne verisi:**
  [`resources__327__STAGE_DATA.json`](../05-research-evidence/artifacts/unity-data/resources__327__STAGE_DATA.json),
  TextAsset `STAGE_DATA`, `path_id: 327`, TextAsset SHA-256
  `1bda310e094da92e3693e1489b43cd4dcd785f72f403ca6080e658eccb898b8d`.
- **Eşya verisi:**
  [`resources__330__ITEM_DATA.json`](../05-research-evidence/artifacts/unity-data/resources__330__ITEM_DATA.json),
  TextAsset `ITEM_DATA`, `path_id: 330`, TextAsset SHA-256
  `b0761aa044be21816f817fba1ac464fe1d4c1cf1a353e78f07f11a10207894ec`;
  ayrıştırılmış JSON SHA-256
  `2fc819cff9cb484e502f87e2993f2d6a3dfdb3f061079eac405f4b42caf099dc`.
- Her iki TextAsset de `resources.assets` içindedir (dosya SHA-256:
  `f5af384c6db4c4df5875fd2fbb4b267ad311118f7434001650f26ee1608800c7`).

## Kapsam ve sayımlar

**Doğrulanmış:** `STAGE_DATA` 24 üst seviye sahne anahtarı ve bu anahtarların
altında toplam 535 kayıt içerir. Bu 535 kaydın yalnız 7'sinde `LootTable`
alanı gözlemlenmiştir; bunlar 7 ayrı sahne anahtarındadır. Tüm bu dizilerde
12 benzersiz eşya kimliği görülür. `ITEM_DATA` 109 üst seviye eşya kimliği
içerir.

Bu, veri dosyasında sahne-özel loot listelerinin seyrek olarak tanımlandığını
gösterir; diğer sahnelerin hangi varsayılan listeyi kullandığını veya bir
listenin ne zaman seçildiğini göstermez.

| Sahne JSON pointer'ı | `LootTable` ham dizisi |
|---|---|
| `/BONEZONE/0/LootTable` | `COIN`, `COINBAG1` |
| `/MACHINE/0/LootTable` | `COIN`, `COINBAG1`, `COINBAGMAX`, `ROAST`, `VACUUM`, `ROSARY` |
| `/STAGEX/0/LootTable` | `COIN`, `COINBAG1`, `ROAST`, `NFT`, `CLOVER` |
| `/EX_LYCAEUM/0/LootTable` | `COIN`, `COINBAG1`, `COINBAGMAX`, `ROAST`, `VACUUM`, `OROLOGION`, `NFT`, `CLOVER`, `GILDED`, `GOLDFINGER`, `PICKUP_REROLL_DICE` |
| `/BATCOUNTRY/0/LootTable` | `COIN`, `COINBAG1`, `COINBAGMAX`, `ROAST`, `VACUUM`, `ROSARY`, `CLOVER`, `GILDED`, `PICKUP_REROLL_DICE` |
| `/ASTRALSTAIR/0/LootTable` | `COIN`, `COINBAG1`, `COINBAGMAX`, `ROAST`, `VACUUM`, `ROSARY`, `CLOVER`, `GILDED`, `OROLOGION`, `GOLDFINGER` |
| `/EX_MAZERELLA/0/LootTable` | `COIN`, `COINBAG1`, `COINBAGMAX`, `ROAST`, `VACUUM`, `ROSARY`, `CLOVER`, `GILDED`, `OROLOGION`, `GOLDFINGER` |

## Referans verilen eşya kayıtları

Tablo, `ITEM_DATA` içindeki ham `name`, `value`, `rarity`, `unlocksAt` ve
varsa `inTreasures` alanlarını gösterir. Boş hücre, alanın ilgili JSON
kaydında bulunmadığı anlamına gelir; sıfır anlamına gelmez.

| Eşya pointer'ı | `name` | `value` | `rarity` | `unlocksAt` | `inTreasures` |
|---|---|---:|---:|---:|---|
| `/COIN` | Gold Coin | 1 | 50 | 0 | false |
| `/COINBAG1` | Coin Bag | 10 | 10 | 0 | false |
| `/COINBAGMAX` | Rich Coin Bag | 100 | 1 | 5 | — |
| `/ROAST` | Floor Chicken | 30 | 12 | 0 | — |
| `/VACUUM` | Vacuum | 500 | 2 | 12 | — |
| `/ROSARY` | Rosary | 500 | 1 | 8 | — |
| `/OROLOGION` | Orologion | 50 | 2 | 4 | — |
| `/NFT` | Nduja Fritta | 300 | 1 | 0 | — |
| `/CLOVER` | Little Clover | 0.1 | 0.5 | 0 | false |
| `/GILDED` | Gilded Clover | 1000 | 1 | 30 | false |
| `/GOLDFINGER` | Gold Finger | 1000 | 0.02 | 30 | false |
| `/PICKUP_REROLL_DICE` | Rerollo | 1 | 1 | 0 | false |

## Ne kanıtlanmadı

- `LootTable` dizisi üyelerinin ağırlıkları bu sahne kayıtlarında yoktur.
  Dolayısıyla dizinin sıra ile seçim, eşit şans veya `rarity` üzerinden ağırlık
  kullandığı söylenemez.
- `ITEM_DATA.rarity` için yüzdeye, olasılığa veya doğrudan ağırlığa dönüşüm
  formülü bu veriyle doğrulanmamıştır.
- `value` alanının her item türü için aynı oyun etkisini ifade ettiği
  doğrulanmamıştır.
- Varsayılan loot tablosunun bileşimi ve DLC tablolarıyla birleştirme kuralı
  bu belge kapsamı dışındadır.

Metadata'da bunların inceleneceği olası yüzeyler vardır: `LootManager` **[17079]**
`GetRandomWeightedItem` (**[152364]**), `MakeDefaultLootTable` (**[152367]**) ve
`MakeCustomLootTable` (**[152370]**) adlarını taşır; `Stage` **[13150]** ise
`get_LootTable` (**[94443]**) metodunu taşır. Bunlar yöntem adlarıdır; çağrı
akışı, ağırlıklandırma veya RNG hesaplaması değildir.

## İlgili belgeler

- [IL2CPP metadata sistem haritası](../04-technical-analysis/metadata-system-map.md)
- [Deneyim ve karaktere bağlı seviye kayıtları](experience-tables.md)
- [Veri asset envanteri](../05-research-evidence/artifacts/unity-data/inventory.json)
