# Temel Oyun Döngüsü

## Genel bakış

Bu belge, referans oyunun çalışma döngüsüne ilişkin yalnızca kanıtlı gözlemleri barındırır. İlk oturumda çalıştırılabilir UI penceresi araç tarafından yakalanamadığından döngünün oynanış adımları henüz **Erişilemedi** durumundadır.

## İşleyiş

**Erişilemedi:** Başlatma, hayatta kalma, otomatik saldırı, XP toplama, seviye seçimi, sandık/ödül ve tur bitişinin sıralı çalışma zamanı kaydı henüz yok.

## Teknik bulgular

- **Kısmen doğrulanmış:** İstemci, Unity IL2CPP çalışma zamanı ve Addressables tabanlı varlıklarla paketlenmiştir ([EV-TECH-001](../05-research-evidence/evidence-index.md#ev-tech-001), [EV-TECH-004](../05-research-evidence/evidence-index.md#ev-tech-004)). Bu, oyun döngüsünün tam şeklini kanıtlamaz.

## Parametreler ve formüller

**Erişilemedi.** Ölçümsüz hiçbir süre, dalga veya hesap formülü yazılmayacaktır.

## Diğer sistemlerle ilişkiler

İleride bu belge [oyuncu](player-and-characters.md), [savaş](weapons-and-combat.md), [düşman](enemies-bosses-and-difficulty.md) ve [seviye](../03-progression-and-balance/experience-and-leveling.md) belgelerindeki zaman damgalı gözlemlerin üst sıralamasını tutacaktır.

## Kanıtlar

`EV-TECH-001`, `EV-TECH-004`; oynanış kanıtı henüz yok.

## Güven düzeyi

Teknik dağıtım için **Kısmen doğrulanmış**; oyun döngüsü için **Erişilemedi**.

## Bilinmeyenler

Tur süresi, zamanlanmış olaylar, ölüm/zafer koşulları, tekrar oynanabilirlik karar noktaları.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

Henüz referans kanıtı oluşmadı. İlkelerin eklenmesi, çalışma zamanı gözlemiyle ertelendi.

## İlgili belgeler

[Durum](../RESEARCH-STATUS.md) · [Gözlem günlüğü](../05-research-evidence/observations-log.md)
