# Seçili IL2CPP Metotlarının Yerel Adres Eşlemesi

## 1. Genel bakış

Bu belge, oyunun bütün `GameAssembly.dll` dosyasını Ghidra'ya içe aktarmadan
seçilmiş on oynanış metodu için IL2CPP metadata satırını yerel makine kodu
adresine bağlar. Çıktı, daha sonraki sınırlı dekompilasyon çalışmalarına giriş
noktası sağlar; metot adlarının davranışı kanıtladığı iddia edilmez.

**Durum: Kısmen doğrulanmış.** Adres eşlemesi statik dosya okuması ile
doğrulandı; bu metotların çalışma zamanındaki çağrı sırası, formülleri ve gerçek
etkileri henüz doğrulanmadı.

## 2. İşleyiş

Yöntem, REA'nın IL2CPP okuyucusundaki şu statik zinciri kullanır:

`metadata type/method index → metadata token → image CodeGenModule → method-pointer slot → PE executable address`

`global-metadata.dat` içindeki her seçilmiş metodun token'ındaki alt 24 bit,
ilgili `CodeGenModule` metod-pointer dizisinin satırını seçer. Sıfır olmayan ve
PE görüntüsündeki yürütülebilir aralığa düşen değerler `code` olarak kaydedildi.
RVA = `method address − PE image base`.

## 3. Teknik bulgular

- **[Doğrulanmış | VS-TECH-NLINK-001]** Metadata dosyası sürüm 31, 42.865.036
  bayt ve SHA-256 `ebc951fb2ade1ee2822ab0565d07108667d1fd608f47512a05e94d7d9043cc2a`.
- **[Doğrulanmış | VS-TECH-NLINK-002]** `GameAssembly.dll`, 158.263.808 baytlık
  AMD64 PE görüntüsüdür; image base `0x180000000`, SHA-256
  `bd5465840091c480aa97073092b4a2bb93608d0bf218125d535be0d7252d48ee`.
- **[Kısmen doğrulanmış | VS-TECH-NLINK-003]** Eşleyici 179 kod-üretim modülü
  ve `codeGenModules` alanı `0x18729e348` ile dizisi `0x18892d5b0` buldu.
  Bu, seçilmiş metadata/binary çiftinin yapısal olarak uyumlu olduğuna dair
  güçlü statik kanıttır; kriptografik bir aynı-derleme kanıtı değildir.

## 4. Seçili metotlar ve parametreler

| Sistem | Metadata metodu | Metadata indeksi | Token | RVA | Durum |
| --- | --- | ---: | --- | --- | --- |
| Oyuncu | `CharacterController.ProcessMovementVector` | 111670 | `0x600676b` | `0x1b15b40` | Doğrulanmış `code` |
| XP/seviye | `CharacterController.AddXp` | 111573 | `0x600670a` | `0x6f2ef20` | Doğrulanmış `code` |
| XP/seviye | `CharacterController.LevelUp` | 111563 | `0x6006700` | `0x6f2d780` | Doğrulanmış `code` |
| Silah | `Weapon.CalculateTotalDamage` | 110692 | `0x6006399` | `0x50af880` | Doğrulanmış `code` |
| Silah | `Weapon.FireOneProjectile` | 110737 | `0x60063c6` | `0x6ed2b90` | Doğrulanmış `code` |
| Düşman | `EnemyController.TargetClosestPlayer` | 114609 | `0x60072e6` | `0x5d3cb80` | Doğrulanmış `code` |
| Düşman | `EnemyController.GetDamaged` | 114619 | `0x60072f0` | `0x5d3d7d0` | Doğrulanmış `code` |
| Düşman | `EnemyController.Die` | 114653 | `0x6007312` | `0x5d41a80` | Doğrulanmış `code` |
| Toplanabilir | `Pickup.CanCharacterCollectPickup` | 104011 | `0x6004980` | `0x7c1390` | Doğrulanmış `code` |
| Toplanabilir | `PickupManager.CreatePickup` | 104089 | `0x60049ce` | `0x6c2c690` | Doğrulanmış `code` |

Tablodaki tür ve metot adları metadata gözlemidir. Örneğin `AddXp` adının XP
artırma kodu olduğunu öne sürmek makul bir **çıkarımdır**, fakat imzası ve
dekompile gövdesi görülmeden kesin mekanik açıklama değildir.

## 5. Diğer sistemlerle ilişkiler

- `CharacterController` seçkisi hareket, XP ve seviye artışını aynı türde
  birleştiren potansiyel araştırma düğümlerini verir.
- `Weapon` seçkisi hasar hesaplaması ile mermi üretimini ayıran iki aday giriş
  noktası sunar.
- `EnemyController` hedef alma, alınan hasar ve ölüm için; `Pickup`/
  `PickupManager` ise toplama izni ve örnek üretimi için sınırları tanımlar.

Bu bağlantılar yalnızca sonraki statik çağrı/gövde incelemesinin öncelik
haritasıdır; aralarındaki çağrı ilişkisi bu çalışmada çözülmedi.

## 6. Kanıtlar

- **VS-TECH-NLINK-001/002/003:** [native-selective-linkage-20261023.json](../05-research-evidence/artifacts/native-selective-linkage-20261023.json)
  (SHA-256 `3c1cb6db20c0797f47f74ab9212f035e293060f672628f8433b81e6dfa1b13ed`).
- Önceki metadata-only kanıtı: [il2cpp-metadata-evidence-20261023.json](../05-research-evidence/artifacts/il2cpp-metadata-evidence-20261023.json),
  REA Evidence ID `ev_c937f97601e0d50315941dbbf017306d2b3499d17d2fd44b1811ccc0261351ee`.
- Tekrarlanabilir araç: [rea-native-selective-il2cpp.mts](../scripts/rea-native-selective-il2cpp.mts)
  (SHA-256 `45476bfed102a90a129012834c57fde291d0b667d8686b52220794ae516e3330`).
- REA kaynak dayanağı (yerel, salt okunur): `src/il2cpp/Il2cppMetadataFile.ts`,
  `Il2cppBinaryImage.ts`, `Il2cppBinaryRegistration.ts`.

## 7. Güven düzeyi

Adresler ve RVA'lar için **doğrulanmış**; REA'nın statik parser/bağlayıcısının
okuduğu dosya baytlarından türetilmiştir. `CodeGenModule` ile metadata görüntüsü
ilişkisi **kısmen doğrulanmış** yapısal eşlemedir. Metotların gerçek oyun
davranışına ilişkin iddialar için bu belge kanıt sağlamaz.

## 8. Bilinmeyenler ve sınırlamalar

- Ghidra henüz bu 158 MB ikiliyi içe aktarmadı; fonksiyon sınırları, decompiler
  çıktısı ve çağrı grafiği yoktur.
- Generic instance, adjustor thunk ve invoker adresleri seçki dışındadır.
- Aynı adresi paylaşan katlanmış (folded) metotlar bu dar seçkide ayrıca
  taranmadı.
- Canlı süreçte kod yama/hook olup olmadığı ve hangi seçilmiş metodun gerçekten
  çağrıldığı bilinmiyor.
- Parametre türleri, dönüş türleri ve hasar/XP formülleri çıkarılmadı.

## 9. Özgün oyunda uygulanabilecek tasarım ilkeleri

Bu kanıtın çıkardığı güvenli genel ilke, oyun kodu yerine adlandırılmış ve veri
ile ilişkilendirilebilir sistem sınırlarını araştırma/değişiklik noktası olarak
kullanmaktır: hareket, XP, seviye, hasar, mermi, hedefleme ve toplama ayrı
giriş noktalarına ayrılabilir. Bu, özgün bir oyunda veri odaklı testler ve
daraltılmış performans ölçümleri planlamayı kolaylaştırır; bu oyunun kodu ya da
varlıkları kopyalanmamalıdır.

## 10. İlgili belgeler

- [Metadata kanıtı](../05-research-evidence/artifacts/il2cpp-metadata-evidence-20261023.json)
- [Seçili native eşleme kanıtı](../05-research-evidence/artifacts/native-selective-linkage-20261023.json)
- [Tekrarlanabilir seçici araç](../scripts/rea-native-selective-il2cpp.mts)
