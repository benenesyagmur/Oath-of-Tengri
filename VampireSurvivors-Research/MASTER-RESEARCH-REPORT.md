# Vampire Survivors — Ana Araştırma Raporu

**Durum:** İlk teknik envanter tamamlandı; çalışma zamanı oynanış gözlemi beklemede.  
**İncelenen yapı:** `B:\Steam\steamapps\common\Vampire Survivors`  
**Son güncelleme:** 23 Ekim 2026 (Europe/Istanbul)

## Kısa sonuçlar

1. **Doğrulanmış — Unity IL2CPP dağıtımı:** Yerel kurulumda `GameAssembly.dll` ve `VampireSurvivors_Data/il2cpp_data/Metadata/global-metadata.dat` birlikte bulunuyor. REA masaüstü taraması bunu `unity-il2cpp` adayı olarak sınıflandırdı; daha güçlü doğrulama için metadata–ikili eşlemesi ve kod analizi gereklidir ([EV-TECH-001](05-research-evidence/evidence-index.md#ev-tech-001)).
2. **Doğrulanmış — Adreslenebilir varlık hattı:** `StreamingAssets/aa` altında `catalog.bin`, `catalog.hash`, `settings.json`, `AddressablesLink/link.xml` ve 1.486 `.bundle` dosyası bulunuyor. Ayar JSON'u Windows x64 hedefini bildiriyor ([EV-TECH-004](05-research-evidence/evidence-index.md#ev-tech-004)).
3. **Kısmen doğrulanmış — Modüler içerik organizasyonu:** Katalogdaki `character`, `characterprefab`, `bestiaryenemyprefab`, `stage` ve `sfx` adlandırma aileleri, içerik yüklemesinin ince taneli adreslenebilir paketlere ayrıldığını gösterir. Dosya adı tek başına oyun davranışını ya da tüm içeriği kanıtlamaz ([EV-TECH-005](05-research-evidence/evidence-index.md#ev-tech-005)).
4. **Erişilemedi — Derin yerel kod çözümlemesi:** REA oturumunda Ghidra sağlayıcısı yapılandırılmamış görünüyor (`GHIDRA_INSTALL_DIR` yok). Kullanıcının mevcut Ghidra kurulumunu değiştirmeden bu oturumda pseudocode alınamadı ([EV-ENV-003](05-research-evidence/evidence-index.md#ev-env-003)).

## Kapsam ve sınırlamalar

- Oyun dosyaları değiştirilmedi. REA yalnızca salt-okunur envanter/metadata işlemleri için kullanıldı.
- İlk UI bağlayıcısı açık oyunu göremedi; dolayısıyla henüz kaydedilmiş oynanış ekranı, HUD ölçümü veya kontrollü deney yoktur. Bu bir olumsuz davranış kanıtı değildir; yalnızca gözlem kanalının erişim sınırıdır.
- IL2CPP metadata taraması, REA'nın 64 MiB sabit rapor bütçesini aştı. Bu nedenle bu aşamada sınıf/metot envanteri çıkarılmadı.

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

Oyun açıkken bir araç erişilebilir pencere yakalayabildiğinde pasif HUD/menü gözlemi alınacak; paralelde Ghidra'nın mevcut kurulum yolunu salt-okunur doğrulayıp REA oturumuna yapılandırma yazmadan sunulabilecek analiz yolunu belirlemek gerekiyor.
