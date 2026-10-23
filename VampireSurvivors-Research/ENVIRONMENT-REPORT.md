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
- Ghidra sağlayıcısı bu REA oturumunda `not_configured` durumunda; ancak yerel Ghidra 12.1.4 kurulumu doğrulandı ve salt-okunur headless analizi başlatıldı. Sonuç ayrı kanıt kaydına eklenecek.
- Bilgisayar-kullanımı aracı başlangıçta açık uygulama penceresi döndürmedi. Başlatma ya da girdi enjeksiyonu yapılmadı.

Ayrıntılı kanıtlar: [kanıt dizini](05-research-evidence/evidence-index.md).
