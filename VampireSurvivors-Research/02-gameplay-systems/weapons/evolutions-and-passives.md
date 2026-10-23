# Evrim bağlantıları ve pasif parametreler

## Genel bakış ve işleyiş

**Doğrulanmış — EV-DATA-002:** evrimler tek bir açıklama dizesi değil, karşılıklı veri referanslarıyla temsil ediliyor. [Tam aday bağlantı indeksi](../../05-research-evidence/artifacts/unity-data/evolutions-derived-index.json) dosya/anahtar ve satır tetikleyicilerini korur. Bu indeks çalışma zamanında uygulanmış evrimlerin listesi değildir.

## Teknik bulgular

`WEAPON_DATA` yolları:

- `/WHIP/0/evoInto=VAMPIRICA`; `/WHIP/0/evoSynergy=[MAXHEALTH]`; `/WHIP/7/addEvolvedWeapon=VAMPIRICA`.
- `/VAMPIRICA/0/evolvesFrom=[WHIP]`; `/VAMPIRICA/0/requires=[MAXHEALTH]`; `isEvolution=true`.
- `/MAGIC_MISSILE/0/evoInto=HOLY_MISSILE`; `/MAGIC_MISSILE/0/evoSynergy=[COOLDOWN]`; `/MAGIC_MISSILE/7/addEvolvedWeapon=HOLY_MISSILE`.

**Kısmen doğrulanmış:** silahın son yükseltme kaydı ve gerekli pasif birlikte evrim adaylığına işaret eder. Sandığın zaman koşulu, harita istisnaları, birden fazla eşyanın maksimum seviyesi ve şans seçim algoritması için henüz kod/oynanış kanıtı yok.

## Parametreler ve formüller

| Anahtar | Veri özelliği | Her satırda değer | Satır sayısı | İlk rarity |
|---|---|---:|---:|---:|
| POWER | power | +0.10 | 5 | 100 |
| MAXHEALTH | maxHp | +0.20 | 5 | 90 |
| COOLDOWN | cooldown | -0.08 | 5 | 50 |
| AREA | area | +0.10 | 5 | 100 |
| GROWTH | growth | +0.08 | 5 | 70 |
| CURSE | curse | +0.10 | 5 | 40 |

Kaynak yolları `/<ANAHTAR>/<0..4>/<özellik>`. `rarity=50` demek %50 çıkma ihtimali değildir: havuz toplamı, kilitler, dışlamalar ve seçim algoritması bilinmiyor. Cooldown satırlarının toplamının -0.40 olması kesin olarak %40 daha çok saldırı demek de değildir; periyot/frekans farkı ve sınırlar doğrulanmalıdır.

## Diğer sistemlerle ilişkiler

Pasiflerin saldırı, HP, XP ve düşman zorluğunu aynı stat isimleri üzerinden etkileyebilmesi **Çıkarım** düzeyinde bir ortak-özellik sistemi gösterir. `/CURSE/0/description` düşman hız/can/miktar/sıklığına etkiyi bildirir; bu dört etkinin ayrı matematiği henüz doğrulanmadı.

## Kanıtlar / güven

EV-DATA-001/002; [kaynak tablo](../../05-research-evidence/artifacts/unity-data/resources__322__WEAPON_DATA.json), [envanter](../../05-research-evidence/artifacts/unity-data/inventory.json). Alan ve sayılar **Doğrulanmış**; hesap sırası **Erişilemedi**.

## Bilinmeyenler

Birleşme ile evrim arasındaki gerçek kod ayrımı; eski silahın kaldırılması; kapasite iadesi; kutu ödül havuzları; arcana etkileri; STORE override önceliği; DLC sahipliği.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

**Çıkarım:** evrimi bir koşul grafiği olarak tasarlamak, bağımsız silah/pasif tercihlerinin birleşmesini sağlar. Özgün oyunda koşullar görünür, test edilebilir ve veri doğrulayıcıyla denetlenebilir olmalı; referansın içerik grafiği kopyalanmamalı.

## İlgili belgeler

[Silah değerleri](base-parameters.md) · [Karakterler](../characters/base-characters.md)
