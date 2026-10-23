# Araştırma Durumu

**Mevcut aşama:** Aşama 1 tamamlandı, Aşama 2 başlatıldı.  
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

- Açık oyundan pasif UI/HUD gözlemi için güvenilir bir pencere kanalı aranıyor.
- Addressables katalog/bundle envanterinin davranıştan bağımsız sınıflandırması sürüyor.
- Ghidra 12.1.4 headless, `GameAssembly.dll` için 600 saniye dosya başına sınır ve `-readOnly` ile çalışıyor. Çıktı, yalnızca araştırma arşivindeki loglara yazılıyor (`EV-GHIDRA-001`, sonuç bekleniyor).

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

- REA metadata raporu: sabit 64 MiB sınırını aştı.
- REA Ghidra sağlayıcısı: `GHIDRA_INSTALL_DIR` yapılandırılmamış; `java.exe` mutlak yol olmadığı için doğrulanamadı.
- Bilgisayar-kullanımı bağlayıcısı, kullanıcının açtığını bildirdiği oyunu uygulama envanterinde göstermedi. Bunun oyun çalışmadığı anlamına gelmediği açıkça kaydedildi.

## Oluşturulan/güncellenen belgeler

Bu klasördeki tüm başlangıç Markdown belgeleri; kanıtlar için [dizin](05-research-evidence/evidence-index.md).

## Sonraki oturum başlangıç noktası

Önce bu dosya ve kanıt dizini okunacak; `EV-TECH-001` kimliğiyle aynı kurulum sürümü doğrulanacak. Ardından oynanış gözlemi veya Ghidra'nın hazır analiz veritabanı üzerinden dar kapsamlı çağrı/metadata sorgusu yapılacak.
