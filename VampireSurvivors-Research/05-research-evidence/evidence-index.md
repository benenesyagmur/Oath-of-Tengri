# Kanıt Dizini

## EV-TECH-001

- **Etiket:** Doğrulanmış (dosya işaretleri); REA sınıflandırması Kısmen doğrulanmış
- **Yöntem:** REA `inspect_desktop_application`, salt-okunur özet tarama
- **Kaynak:** `B:\Steam\steamapps\common\Vampire Survivors`
- **Sonuç:** 1.569 girdilik taramada `GameAssembly.dll` ve `VampireSurvivors_Data/il2cpp_data/Metadata/global-metadata.dat` üzerinden Unity IL2CPP adayı saptandı.
- **REA kanıtı:** `ev_c74ff88e81d0d582f6b56e0e17d4afb4589ce813b16c498ed587da40cd989ee8` (üst kaynak: `ev_c32b305b846f65b1c1120eda578d9fd51fd78f505615a31310cb100affeb4a9d`)
- **Sınır:** Aday sınıflandırması, runtime davranışını ve aynı-build eşlemesini ispatlamaz.
- **İlgili:** [Mimari](../04-technical-analysis/architecture-and-runtime.md)

## EV-TECH-002

- **Etiket:** Doğrulanmış
- **Yöntem:** Salt-okunur dosya listeleme + REA `open_binary`
- **Kaynak:** `GameAssembly.dll`
- **Sonuç:** PE, x86-64, SHA-256 `bd5465840091c480aa97073092b4a2bb93608d0bf218125d535be0d7252d48ee`.
- **İlgili:** [Mimari](../04-technical-analysis/architecture-and-runtime.md)

## EV-TECH-003

- **Etiket:** Doğrulanmış
- **Yöntem:** `Get-FileHash -Algorithm SHA256`
- **Kaynak/Sonuç:** `VampireSurvivors.exe` `438e17b2ed2c844d57e75fe398a33354256bc68e2f7d88bbeb5e6796175d70d8`; `UnityPlayer.dll` `4abd2ee6d6ca6176b3122a22cc0264ea0e3c1674bd2969621fe72decbf7b5134`; `global-metadata.dat` `ebc951fb2ade1ee2822ab0565d07108667d1fd608f47512a05e94d7d9043cc2a`.
- **İlgili:** [Ortam](../ENVIRONMENT-REPORT.md)

## EV-TECH-004

- **Etiket:** Doğrulanmış
- **Yöntem:** Salt-okunur dosya listeleme ve `settings.json` JSON ayrıştırması
- **Kaynak:** `VampireSurvivors_Data/StreamingAssets/aa`
- **Sonuç:** Addressables dosyaları, 1.486 bundle, `StandaloneWindows64`, 1 katalog konumu, 500 azami eşzamanlı web isteği ayarı.
- **İlgili:** [Varlık hattı](../04-technical-analysis/assets-and-data-pipeline.md)

## EV-TECH-005

- **Etiket:** Kısmen doğrulanmış
- **Yöntem:** `catalog.bin` üzerinde salt-okunur ASCII dize taraması (`rg -a`)
- **Kaynak:** `StreamingAssets/aa/catalog.bin`
- **Sonuç:** `character`, `characterprefab`, `bestiaryenemyprefab`, `stage`, `sfx`, `ui`, `music` adlandırma aileleri gözlendi.
- **Sınır:** Dize adı; davranış, erişilebilirlik veya yüklenmiş durum kanıtı değildir.
- **İlgili:** [Karakterler](../02-gameplay-systems/player-and-characters.md), [Düşmanlar](../02-gameplay-systems/enemies-bosses-and-difficulty.md), [Savaş](../02-gameplay-systems/weapons-and-combat.md)

## EV-ENV-003

- **Etiket:** Doğrulanmış
- **Yöntem:** REA `binary_session` yetenek/teşhis raporu
- **Sonuç:** Ghidra sağlayıcısı `not_configured`; `GHIDRA_INSTALL_DIR` yok. Java doğrulaması mutlak yol eksikliği nedeniyle tamamlanamadı.
- **Sınır:** Bu, bilgisayarda Ghidra'nın hiç kurulu olmadığını kanıtlamaz; yalnızca bu REA oturumunun onu bağlayamadığını kanıtlar.
- **İlgili:** [Ortam](../ENVIRONMENT-REPORT.md)

## EV-LIMIT-001

- **Etiket:** Erişilemedi
- **Yöntem:** REA `inspect_il2cpp_metadata` (metadata + GameAssembly)
- **Sonuç:** İlk çağrı mimari parametresi uygunsuz seçildi; düzeltilen çağrı tam metadata raporunun sabit 64 MiB bütçeyi aştığını bildirdi.
- **REA kanıtı:** `ev_a1df08932a7fc3e6f5ff0fd65c8a18a7816664f5e558510eeec5170a002c15ad`
- **Etkisi:** Bu aşamada tam sınıf/metot tablosu yoktur.

## EV-GHIDRA-001

- **Etiket:** Devam ediyor
- **Yöntem:** Ghidra 12.1.4 `analyzeHeadless.bat`, resmi `-import`, `-readOnly`, `-analysisTimeoutPerFile 600`, `-max-cpu 2` seçenekleri.
- **Kaynak:** `GameAssembly.dll`; proje/log hedefi yalnızca `05-research-evidence/artifacts/` altındadır.
- **Amaç:** Yerel ikilinin varsayılan auto-analysis sürecinin tamamlanıp tamamlanamadığını ve hata/süre sınırı durumunu kaydetmek.
- **Güvenlik sınırı:** Girdi ikili dosyası veya oyun dosyası değiştirilmez. `-readOnly` importu geçici proje olarak işler; Ghidra belgesine göre kaydedilmez ve yeni proje oturum sonunda silinir.
- **Ara gözlem:** Ghidra inputu başarıyla PE yükleyicisiyle içe aktardı; dil/derleyici `x86:LE:64:default:windows` olarak seçildi ve TLS callback adresi `18712cb40` loglandı. Auto-analysis halen çalışıyor; bu satırlar oyun davranışı değil ikili yükleyici gözlemidir.
- **Sonuç:** Devam ediyor.
