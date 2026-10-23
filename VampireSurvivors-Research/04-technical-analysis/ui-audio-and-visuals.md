# Arayüz, Görsel ve Ses Yüzeyi

## Genel bakış

Katalogdaki `ui_*`, `sfx_*` ve `music_*` anahtar aileleri; UI, ses efekti ve müzikle ilgili paketlenmiş varlık adlarının varlığını doğrular. Menü/HUD düzeni, animasyon, parçacık veya ses tetikleme davranışı henüz gözlenmedi.

## İşleyiş

- **Kısmen doğrulanmış:** `ui_menu`, `ui_bestiary`, `ui_stageicons`, `sfx_treasure_*`, `sfx_death` ve `music_*` türünde katalog dizeleri görüldü (`EV-TECH-005`).
- **Erişilemedi:** Ana menü, karakter/harita seçimi, HUD, seviye seçimi, duraklatma, ölüm/zafer ekranı; ses miksajı ve VFX zamanlaması.

## Teknik bulgular

Adreslenebilir paketleme, UI/ses içeriklerinin yükleme kimlikleri taşıyabileceğini gösterir; ekran akışını veya ses olaylarını kanıtlamaz.

## Parametreler ve formüller

Erişilemedi.

## Diğer sistemlerle ilişkiler

HUD, savaş/XP/ilerleme olaylarını oyuncuya görünür hale getirir; bu ilişki referans oyunda gözlemle henüz doğrulanmadı.

## Kanıtlar

`EV-TECH-005`.

## Güven düzeyi

Varlık-adı yüzeyi **Kısmen doğrulanmış**; davranış **Erişilemedi**.

## Bilinmeyenler

Tüm ekran durumları, erişilebilirlik, geri bildirim katmanları ve ses eşleme tablosu.

## Özgün oyun ilkeleri

**Çıkarım:** Savaş olayını (vuruş, ödül, tehlike, seçim) ayrı görsel/ses geri bildirim kanallarıyla temsil etmek, yoğun ekranda karar okunabilirliğini iyileştirebilir. Etki, ileride runtime gözlemiyle değerlendirilmelidir.

## İlgili belgeler

[Varlık hattı](assets-and-data-pipeline.md) · [Gözlem günlüğü](../05-research-evidence/observations-log.md)
