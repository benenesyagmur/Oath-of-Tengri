# Araştırma Durumu

**Mevcut aşama:** Aşama 2–5 statik veri incelemesi; Aşama 1 temel envanter tamamlandı, derin teknik analiz sürüyor. Hiçbir oynanış aşaması bütünüyle tamamlanmış sayılmıyor.  
**Güncelleme:** 23 Ekim 2026 (Europe/Istanbul)

## Tamamlanan

- Yerel oyun kökü doğrulandı ve salt-okunur dosya envanteri çıkarıldı.
- REA ile masaüstü uygulaması tarandı (`EV-TECH-001`).
- Çalışma zamanı, IL2CPP metadata ve Addressables işaretleri doğrulandı (`EV-TECH-002`–`005`).
- Çekirdek dosyaların SHA-256 kimlikleri kaydedildi (`EV-TECH-003`).
- REA/Ghidra yetenekleri kontrol edildi; derin Ghidra sağlayıcısının bu oturumda yapılandırılmadığı kaydedildi (`EV-ENV-003`).
- Yerel Ghidra 12.1.4 headless ile `GameAssembly.dll` için salt-okunur auto-analysis başlatıldı; PE/x86-64 yükleme seçimi logdan doğrulandı (`EV-GHIDRA-001`).
- Araştırma arşivi oluşturuldu ve ilk sistem belgeleri dolduruldu.

## Devam eden

### 23 Ekim devam oturumu kontrol noktası

- **Tamamlanan:** REA metadata-only export:179 image/42.100 type/332.115 method. Binary dahil tam rapor limiti çözülmüş değil; dar kapsam alternatif başarılı.
- **Tamamlanan:** 14 Unity dosyasından105 TextAsset envanteri,101 JSON/JSON5 tablo, kaynak/nesne/çıktı SHA-256 kaydı. Araştırmaya özel UnityPy1.25.4 ve JSON5 0.17.3 eklendi; oyun/REA kurulumu değiştirilmedi.
- **Tamamlanan:** 526 silah/pasif kaydı (489 benzersiz anahtar),270 karakter (268 anahtar),1.186 düşman (1.185 anahtar),39 stageData kaydı için kapsam sayımı. Bunlar oynanabilir içerik sayıları değildir.
- **Tamamlanan:** WHIP/MAGIC_MISSILE seviye kayıtları, iki evrim bağlantısı, altı pasifin sayısal alanları, üç başlangıç karakterinin stat/level kayıtları belgelendi.
- **Tamamlanan:**10 temel metot için REA kaynak okuyucularıyla native RVA eşlemesi.
- **Devam eden:** XP/loot ve düşman/stage tablolarının ayrı ajanlarca kaynak bağlı incelemesi; seçilmiş4 metot için Ghidra gövde çözümü.
- **Önemli eksik:** canlı ekran kaydı, kontrollü atış/hasar/XP deneyi yok. Metadata isimleri veya tablo değerleri kesin runtime formülü olarak sunulmadı.
- **Yeni belgeler:** [veri çıkarımı](04-technical-analysis/data-extraction.md), [silah](02-gameplay-systems/weapons/base-parameters.md), [evrim/pasif](02-gameplay-systems/weapons/evolutions-and-passives.md), [karakter](02-gameplay-systems/characters/base-characters.md), [native eşleme](04-technical-analysis/native-linkage.md).
- **Devam noktası:** `artifacts/unity-data/inventory.json` ve `summary.json` kullanılarak aynı çıkarım tekrarlanmadan analiz sürdürülecek; Ghidra seçici işlem sonuçları kontrol edilecek.

- Açık oyundan pasif UI/HUD gözlemi için güvenilir bir pencere kanalı aranıyor.
- Addressables katalog/bundle envanterinin davranıştan bağımsız sınıflandırması sürüyor.
- Ghidra auto-analysis tamamlanmadan 600 saniye sınırına ulaştı. Bir sonraki kod adımı, tüm ikili analizini tekrar etmek değil; IL2CPP metadata ve seçilmiş string/cross-reference odaklarıyla dar kapsamlı analizdir.

## Sonraki görevler

1. Ghidra kurulumunun ve Java yolunun salt-okunur doğrulaması; kuruluma/config'e yazmadan uygulanabilir REA çözümünün belgelenmesi.
2. Yalnızca kontrollü, kullanıcı yürütümlü bir oturumda hareket, otomatik saldırı, XP toplama ve seviye seçimi gözlemi.
3. Metadata/kod için isim odaklı, küçük kapsamlı sorgular veya mevcut Ghidra projesi üzerinden ilişki analizi.
4. Harita, düşman üretimi ve kalıcı ilerleme için ayrı kanıt planları.

## Eksik kanıtlar

- Hasar, saldırı aralığı, alan, mermi sayısı ve evrim formülleri.
- Düşman dalga çizelgeleri, boss tetikleyicileri ve zorluk katsayıları.
- Karakter/kilit açma koşulları, ekonomi ve kayıt formatı.
- UI akışı, ses/görsel geri bildirimin oyun içi bağlamı.

## Teknik engeller

- REA birleşik metadata+binary raporu sabit64MiB sınırını aştı; metadata-only export ve seçici native adres scripti başarılı alternatiflerdir.
- REA Ghidra sağlayıcısı: `GHIDRA_INSTALL_DIR` yapılandırılmamış; `java.exe` mutlak yol olmadığı için doğrulanamadı.
- Ghidra 12.1.4 genel auto-analysis: `GameAssembly.dll` için 600 saniye limiti aştı; PDB bulunamadı. İçe aktarma salt-okunur olduğu için hiçbir Ghidra program veritabanı tutulmadı.
- Hem ilk bağlayıcı hem son Windows sky pencere kontrolü hedefi göstermedi; Get-Process ad filtresi de eşleşmedi. Oynanış gözlemi alınamadı (EV-OBS-002); kullanıcı koşusuna girdi gönderilmedi.

## Oluşturulan/güncellenen belgeler

Bu klasördeki tüm başlangıç Markdown belgeleri; kanıtlar için [dizin](05-research-evidence/evidence-index.md).

## Sonraki oturum başlangıç noktası

Önce bu dosya ve kanıt dizini okunacak; `EV-TECH-001` kimliğiyle aynı kurulum sürümü doğrulanacak. Ardından oynanış gözlemi veya Ghidra'nın hazır analiz veritabanı üzerinden dar kapsamlı çağrı/metadata sorgusu yapılacak.
