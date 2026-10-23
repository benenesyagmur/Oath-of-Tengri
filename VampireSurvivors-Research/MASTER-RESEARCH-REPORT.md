# Vampire Survivors — Ana Araştırma Raporu

**Durum:** Gerçek veri tabloları çıkarıldı, silah/karakter/düşman/ilerleme incelemesi sürüyor. Çalışma zamanı ve tam formül doğrulaması henüz tamamlanmadı.  
**İncelenen yapı:** `B:\Steam\steamapps\common\Vampire Survivors`  
**Son güncelleme:** 23 Ekim 2026 (Europe/Istanbul)

## Kısa sonuçlar

### Son oturumun önemli ilerlemesi

- **Doğrulanmış:**14 yerel dosyada105 TextAsset ve101 JSON/JSON5 tablo; Unity serialized başlıkları6000.0.62f1. [Kaynaklar, hash'ler, kapsam ve tekrar üretim](04-technical-analysis/data-extraction.md).
- **Doğrulanmış:** ana tabloda153 silah/pasif,579 düşman,70 karakter,24 aşama anahtarı. Paketlerin tamamından çıkarılan ilgili tablolarda489 benzersiz silah/pasif ve1.185 benzersiz düşman anahtarı var. Bunlar oynanabilir/sahip olunan içerik sayıları değildir.
- **Doğrulanmış:** [silah seviye değerleri](02-gameplay-systems/weapons/base-parameters.md), [evrim/pasif referansları](02-gameplay-systems/weapons/evolutions-and-passives.md), [karakter başlangıçları](02-gameplay-systems/characters/base-characters.md) gerçek yerel veriden kaydedildi. Parametre birimleri ve formüller henüz kod/deneyle tam doğrulanmadı.
- **Doğrulanmış:** REA metadata-only raporu42.100 tip/332.115 metot içerir. **Kısmen doğrulanmış:**10 seçili metot metadata tokenlarından native adreslere eşlendi; [adres haritası](04-technical-analysis/native-linkage.md). İsimler davranış kanıtı değildir.

### Önceki teknik bulgular

1. **Doğrulanmış — Unity IL2CPP dağıtımı:** Yerel kurulumda `GameAssembly.dll` ve `VampireSurvivors_Data/il2cpp_data/Metadata/global-metadata.dat` birlikte bulunuyor. REA masaüstü taraması bunu `unity-il2cpp` adayı olarak sınıflandırdı; daha güçlü doğrulama için metadata–ikili eşlemesi ve kod analizi gereklidir ([EV-TECH-001](05-research-evidence/evidence-index.md#ev-tech-001)).
2. **Doğrulanmış — Adreslenebilir varlık hattı:** `StreamingAssets/aa` altında `catalog.bin`, `catalog.hash`, `settings.json`, `AddressablesLink/link.xml` ve 1.486 `.bundle` dosyası bulunuyor. Ayar JSON'u Windows x64 hedefini bildiriyor ([EV-TECH-004](05-research-evidence/evidence-index.md#ev-tech-004)).
3. **Kısmen doğrulanmış — Modüler içerik organizasyonu:** Katalogdaki `character`, `characterprefab`, `bestiaryenemyprefab`, `stage` ve `sfx` adlandırma aileleri, içerik yüklemesinin ince taneli adreslenebilir paketlere ayrıldığını gösterir. Dosya adı tek başına oyun davranışını ya da tüm içeriği kanıtlamaz ([EV-TECH-005](05-research-evidence/evidence-index.md#ev-tech-005)).
4. **Erişilemedi — Derin yerel kod çözümlemesi:** REA oturumunda Ghidra sağlayıcısı yapılandırılmamış görünüyor (`GHIDRA_INSTALL_DIR` yok). Kullanıcının mevcut Ghidra kurulumunu değiştirmeden bu oturumda pseudocode alınamadı ([EV-ENV-003](05-research-evidence/evidence-index.md#ev-env-003)).

## Kapsam ve sınırlamalar

- Oyun dosyaları değiştirilmedi. REA yalnızca salt-okunur envanter/metadata işlemleri için kullanıldı.
- İlk UI bağlayıcısı açık oyunu göremedi; dolayısıyla henüz kaydedilmiş oynanış ekranı, HUD ölçümü veya kontrollü deney yoktur. Bu bir olumsuz davranış kanıtı değildir; yalnızca gözlem kanalının erişim sınırıdır.
- Birleşik IL2CPP metadata+binary raporu64MiB sabit bütçeyi aştı; daha sonra binary olmadan metadata envanteri başarıyla saklandı. Seçici native eşleme ayrıca üretildi; limit artırılmadı.
- Ghidra genel auto-analysis600 saniyede tamamlanamadı. Başarılı PE importu davranış çözümlemesiyle karıştırılmamalı; seçici dekompilasyon çalışması ayrı izleniyor.
- Araştırma JSON'ları yalnızca inceleme kanıtıdır; yeni oyuna kod, varlık veya içerik aktarımı yapılmadı. Yeni oyun geliştirme başlatılmadı.

## Belge haritası

- [Temel döngü](02-gameplay-systems/core-loop.md)
- [Oyuncu/karakter](02-gameplay-systems/player-and-characters.md)
- [Silah/savaş](02-gameplay-systems/weapons-and-combat.md)
- [Düşmanlar ve zorluk](02-gameplay-systems/enemies-bosses-and-difficulty.md)
- [Seviye ve ödül](03-progression-and-balance/experience-and-leveling.md)
- [Kalıcı ilerleme](03-progression-and-balance/meta-progression-and-economy.md)
- [Teknik mimari](04-technical-analysis/architecture-and-runtime.md)
- [Varlık/veri hattı](04-technical-analysis/assets-and-data-pipeline.md)
- [Özgün oyun için ilkeler](06-original-game-design/design-principles.md)

## Sonraki kritik adım

XP/hasar metotlarının seçici Ghidra çözümüyle tablo alanlarının birimlerini ve işlem sırasını doğrulamak; düşman/stage/loot bulgularını kaynak yollarıyla birleştirmek. Erişilebilir oyun penceresi oluştuğunda kullanıcının koşusuna müdahale etmeden pasif ekran kanıtı almak; kontrollü deneyleri bundan ayrı tutmak.
