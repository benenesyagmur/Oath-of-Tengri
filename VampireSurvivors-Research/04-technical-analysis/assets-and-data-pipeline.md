# Varlık ve Veri Hattı

## Genel bakış

Dağıtımda Unity Addressables görünür biçimde bulunmaktadır: `StreamingAssets/aa/catalog.bin`, `catalog.hash`, `settings.json` ve `AddressablesLink/link.xml` mevcuttur.

## İşleyiş

- **Doğrulanmış:** `settings.json` içindeki `m_buildTarget` değeri `StandaloneWindows64`; katalog konumu sayısı 1; `m_LogResourceManagerExceptions` değeri `false`; `m_MaxConcurrentWebRequests` değeri 500'dir.
- **Doğrulanmış:** Oyun kökünde 1.486 `.bundle` dosyası tespit edildi.
- **Kısmen doğrulanmış:** Katalog dizesinde karakter, karakter prefabı, düşman prefabı, sahne/harita desteği, UI ve ses sınıflarına işaret eden anahtar aileleri vardır. Katalogda bir anahtarın olması, her varlığın çalışma zamanında yüklendiğini veya oyuncunun erişebildiğini göstermez.

## Teknik bulgular

Örnek anahtar aileleri: `*_dynamic_assets_character_*`, `*_dynamic_assets_characterprefab_*`, `*_bestiaryenemyprefab-*`, `*_stage*`, `sfx_*`, `ui_*`, `music_*`. Bu sınıflar ad tabanlı kanıttır; içerik listesi olarak değerlendirilmemelidir.

## Parametreler ve formüller

Yükleme önceliği, cache politikası, bundle bağımlılık grafiği ve platform dışı katalog davranışı **Erişilemedi**.

## Diğer sistemlerle ilişkiler

Bu katman, [karakter](../02-gameplay-systems/player-and-characters.md), [düşman](../02-gameplay-systems/enemies-bosses-and-difficulty.md), [savaşın ses/VFX yüzeyi](../02-gameplay-systems/weapons-and-combat.md) ve UI varlıklarını taşıyabilir.

## Kanıtlar

`EV-TECH-004`, `EV-TECH-005`.

## Güven düzeyi

Dosyalar ve ayarlar **Doğrulanmış**; adlandırmadan çıkan sistem ilişkisi **Kısmen doğrulanmış**.

## Bilinmeyenler

Bundle içeriğinin tipleri, varlık–kural verisi ilişkisi, her varlığın yükleme koşulu ve sürüm/DLC ayrımı.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

**Çıkarım:** Bir içerik paketini karakter, düşman, sahne, UI ve ses yönünden ayrı adreslenebilir birimler halinde düzenlemek, yeni içerik eklemeyi ana yürütülebilirden kısmen ayırabilir. Özgün oyunda kendi şema/adlarınızla uygulanmalıdır.

## İlgili belgeler

[Mimari](architecture-and-runtime.md) · [Kanıt dizini](../05-research-evidence/evidence-index.md)
