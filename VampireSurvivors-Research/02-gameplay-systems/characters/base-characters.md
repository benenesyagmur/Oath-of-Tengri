# Karakter başlangıçları ve seviye farkları

## Genel bakış

**Doğrulanmış — EV-DATA-007:** ana `CHARACTER_DATA` 70 kayıt; tüm çıkarılmış karakter tabloları 270 kayıt / 268 benzersiz anahtar içerir. STORE varyantları bulunduğundan bunları oynanabilir karakter sayısı olarak sunmuyoruz. [Türetilmiş karakter indeksi](../../05-research-evidence/artifacts/unity-data/characters-derived-index.json).

## İşleyiş / teknik bulgular

İlk satır başlangıç silahı, HP, armor, hareket ve stat alanlarını taşır; sonraki satırlarda `level` koşullu değişiklikler bulunur. Mevcut kullanıcının kayıt dosyası okunmadı: `isBought` değerleri paketlenmiş varsayılanlardır.

## Parametreler

| `/ANAHTAR/0` | startingWeapon | maxHp | armor | moveSpeed | price | isBought |
|---|---|---:|---:|---:|---:|---|
| ANTONIO | WHIP | 120 | 1 | 1 | 0 | true |
| IMELDA | MAGIC_MISSILE | 100 | 0 | 1 | 10 | false |
| PASQUALINA | DIAMOND | 100 | 0 | 1 | 100 | false |

Antonio: level 10/20/30/40/50 satırlarında `power:+0.1`. Imelda: level 5/10/15 satırlarında `growth:+0.1`. Pasqualina: başlangıç `speed=1.1`, level 5/10/15 satırlarında `speed:+0.1`. Üçünde de level20 ve40 `growth:+1`, level21 ve41 `growth:-1` kayıtları var.

**Çıkarım:** level20/40 kayıtları, karakter özel bonusundan ayrı geçici XP düzenlemesi olabilir. Dizi sıra olarak 50'den sonra21/41 içerebildiği için satır indeksi karakter seviyesi yerine geçmez. Gerçek tetikleyici ve XP hesap sırası için kod çözümü gerekir; bunları doğrulanmış XP eşik formülü saymıyoruz.

## Diğer sistemlerle ilişkiler

`startingWeapon` → silah tablosu; `growth` → XP; `price/isBought` → ekonomi; `skins/currentSkin` → görsel seçim; `completedStages` gibi alanlar → ilerleme durumu. Alan ilişkileri **Kısmen doğrulanmış**, kayıt serileştirme akışı henüz çözülmedi.

## Kanıtlar / güven düzeyi

EV-DATA-007. [Kaynak](../../05-research-evidence/artifacts/unity-data/resources__332__CHARACTER_DATA.json), path_id332; ham metin SHA-256 `707f47aa877ebd1232ea18ef950cb1186f5233f877385b074cc80d1afd5bc5f4`. Statik değerler **Doğrulanmış**, gerçek koşu değerleri **Erişilemedi**.

## Bilinmeyenler

Temel hareket birimi, çapraz hareket normalizasyonu, hasar/armor sırası, i-frame, ölüm ve revival davranışı, kalıcı güçlerle birleştirme, karakter açma koşullarının tamamı.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

**Çıkarım:** başlangıç silahı ve belirli seviyelerde gelen stat farkları, karakterleri tamamen ayrı kod yolları yazmadan ayrıştırabilir. Yeni oyunun kimlikleri, büyüme eşikleri ve sayıları özgün tasarlanmalıdır.

## İlgili belgeler

[Oyuncu üst belgesi](../player-and-characters.md) · [Silah parametreleri](../weapons/base-parameters.md) · [XP araştırması](../../03-progression-and-balance/experience-and-leveling.md)
