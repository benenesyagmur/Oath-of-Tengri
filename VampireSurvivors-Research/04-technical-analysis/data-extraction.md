# Yerel veri tablolarının çıkarılması

## Genel bakış

**Doğrulanmış — EV-DATA-001:** 23 Ekim 2026'da 14 dosya salt-okunur ayrıştırıldı: `resources.assets`, `globalgamemanagers.assets`, dört `sharedassets*.assets` ve sekiz `*_persistent_assets_all.bundle`. 105 TextAsset içinde 101 ayrıştırılabilir JSON/JSON5 nesnesi bulundu. Bu, 1.486 bundle'ın tamamının içerik denetimi değildir.

## İşleyiş ve teknik bulgular

[Çıkarıcı](../scripts/inspect-unity-data.py), UnityPy 1.25.4 ile nesne türünü kontrol eder; yalnızca TextAsset metnini JSON olarak araştırma arşivine yazar. Unity varlıklarını kaydetmez; resim, müzik veya oyun kodu dışa aktarmaz. Bağımlılıklar yalnızca araştırmanın `.tools/python` dizinine eklendi; pip kendi indirme önbelleğine de yazmış olabilir. REA/Ghidra yeniden kurulmadı.

İlk katı JSON geçişi 97 tablo okudu. JSON5 0.17.3 yedeğiyle `ARCANA_DATA`, `trophy02`, `weaponData_ThosePeople`, `achievementData_ThosePeople` de okundu: 101. Katı ayrıştırma hataları envanterde saklıdır. JSON5 geçişi yinelenen anahtarları reddeder. Kalan dört metin `eosPluginVersion`, iki satır-kırma karakter listesi ve `CreditTimecodes`; bunları şifreli oyun tablosu diye sınıflandırmıyoruz.

14 serialized file başlığında `6000.0.62f1` okunmuştur. **Doğrulanmış:** kaynaklarda bildirilen Unity sürümü. Bu tek başına her DLL'nin aynı derleme olduğunu kanıtlamaz.

## Kapsam ve sayılar

| Veri ailesi | Tüm tablolardaki kayıt toplamı | Benzersiz anahtar | Ana kaynak tablosu |
|---|---:|---:|---:|
| Silah/pasif | 526 | 489 | 153 |
| Karakter | 270 | 268 | 70 |
| Düşman | 1.186 | 1.185 | 579 |
| Aşama | 39 | 39 | 24 |
| Eşya | 134 | 134 | 109 |
| Başarım | 489 | 489 | 213 |

**Sınır:** Bunlar kurulu dosyaların anahtarlarıdır; oynanabilir, satın alınmış, kilidi açılmış ya da benzersiz tasarımlar değildir. STORE varyantları ve gölgelenen anahtarlar var; runtime birleştirme sırası çözülmedi. `AdventureStages` 69 kaydı bu `stageData` aile toplamına dahil değildir. `ARCANA_DATA` 76, `LIMITBREAK_DATA` 90, `POWERUP_DATA` 29 anahtar taşır.

## Kaynak kimliği ve tekrar üretim

- Ana kaynak: `B:\Steam\steamapps\common\Vampire Survivors\VampireSurvivors_Data\resources.assets`
- SHA-256: `f5af384c6db4c4df5875fd2fbb4b267ad311118f7434001650f26ee1608800c7`
- [Envanter](../05-research-evidence/artifacts/unity-data/inventory.json): her dosya hash'i; TextAsset adı, serialized-file adı, 64 bit path_id, ham metin hash'i, ayrıştırılmış dosya hash'i ve parser türü.
- [Sayım özeti](../05-research-evidence/artifacts/unity-data/summary.json), [türetme scripti](../scripts/summarize-data-tables.py).

PowerShell:

```powershell
cd 'A:\Oath of Tengri\VampireSurvivors-Research'
& 'C:\Users\benen\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' '.\scripts\inspect-unity-data.py'
& 'C:\Users\benen\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' '.\scripts\summarize-data-tables.py'
```

Scriptler araştırma JSON çıktısını yeniler; oyun dosyalarına yazmaz. Yeni sürüm araştırılacaksa önce mevcut kanıt klasörünü koruyun. Bazı path_id değerleri JavaScript güvenli tamsayı sınırından büyüktür; kesin kimliği JSON metninden/Python tamsayısından alın, JavaScript Number ile yeniden yazmayın.

## Güven düzeyi ve bilinmeyenler

Dosyada saklanan değerler için **Doğrulanmış**; oynarken uygulanan değerler, birimler, değiştirici sırası ve erişim koşulları için **Kısmen doğrulanmış** veya **Erişilemedi**. İkinci bağımsız ayrıştırıcıyla doğrulama yapılmadı. JSON normalleştirilmiş kanıttır, orijinal metnin bayt-kopyası değildir; iki hash bu farkı görünür tutar.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

**Çıkarım:** Sayısal temel kayıtları, seviye değişikliklerini ve içerik paketlerini ayrı veri katmanları olarak tasarlamak denge analizini kolaylaştırabilir. Araştırma tabloları yeni oyunun üretim verisi olarak kullanılmayacak; özgün değerler ve özgün içerik gereklidir.

## İlgili belgeler

[Ana rapor](../MASTER-RESEARCH-REPORT.md) · [Silah tabloları](../02-gameplay-systems/weapons/base-parameters.md) · [Kanıt dizini](../05-research-evidence/evidence-index.md)
