# Teknik Mimari ve Çalışma Zamanı

## Genel bakış

Yerel yapı Unity tabanlı, IL2CPP işaretli, Windows x64 hedefli bir dağıtımdır.

## İşleyiş

- **Doğrulanmış:** `GameAssembly.dll` x86-64 PE dosyasıdır ve SHA-256 değeri `bd5465840091c480aa97073092b4a2bb93608d0bf218125d535be0d7252d48ee` olarak ölçüldü.
- **Doğrulanmış:** Ghidra headless, aynı ikiliyi Portable Executable yükleyicisi ve `x86:LE:64:default:windows` dil/derleyici seçimiyle içe aktardı (`EV-GHIDRA-001`).
- **Doğrulanmış:** `global-metadata.dat` yereldedir; SHA-256 değeri `ebc951fb2ade1ee2822ab0565d07108667d1fd608f47512a05e94d7d9043cc2a` olarak ölçüldü.
- **Kısmen doğrulanmış:** REA, iki işareti birlikte `unity-il2cpp` adayına dönüştürdü. Bu sınıflandırma runtime yüklemesini veya metadata–kod eşlemesini tek başına kanıtlamaz.
- **Doğrulanmış:** `RuntimeInitializeOnLoads.json`, oyun/çerçeve başlatım kayıtları içerir; burada `VampireSurvivors.Framework.Loading.AddressableLoader.SetInternalIdTransform` ve `VampireSurvivors.App.Framework.System.UnityServicesManager.InitOnLoad` adları görülür. Bu, dosyadaki derlenmiş başlatım bildirimidir; bu yöntemlerin çalıştığı gözlemlenmedi.

## Parametreler ve formüller

`boot.config`'de gözlenen ilgili satırlar: `gfx-enable-gfx-jobs=1`, `gfx-threading-mode=6`, `gc-max-time-slice=3`. Anlam ve performans etkisi çalışma zamanı profillemesi olmadan doğrulanmış sayılmaz.

## Diğer sistemlerle ilişkiler

İçerik erişimi [Addressables hattı](assets-and-data-pipeline.md) üzerinden paketlenebilir. Oyun mantığı için olası derlenmiş yüzey `GameAssembly.dll`/IL2CPP metadata ikilisidir.

## Kanıtlar

`EV-TECH-001`, `EV-TECH-002`, `EV-TECH-003`, `EV-TECH-004`.

## Güven düzeyi

Dosya/mimari işaretleri **Doğrulanmış**; davranışsal sonuçlar **Kısmen doğrulanmış** veya **Erişilemedi**.

## Bilinmeyenler

Nesne yaşam döngüsü, zamanlayıcı, bellek/pooling stratejisi, yükleme zamanları ve gerçek çalışma zamanı bağımlılıkları.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

**Çıkarım:** Oyun mantığı, içerik paketi ve platform eklentilerini ayrıştırmak; büyük içerik setlerinde hedefe özgü, lazy-load edilebilir bir varlık katmanı sağlar. Bu teknik mimari fikri, referansın adlarını ya da verisini kopyalamayı gerektirmez.

## İlgili belgeler

[Varlık hattı](assets-and-data-pipeline.md) · [Ortam](../ENVIRONMENT-REPORT.md)
