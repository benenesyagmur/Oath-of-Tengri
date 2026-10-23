# Silah ve Savaş Sistemi

## Genel bakış

İlk teknik envanter, ses anahtarlarında çok sayıda saldırı/etki adı ve içerik paketleri gösterdi; bunun oyun kuralı değil varlık adlandırması olduğu özellikle not edilmiştir ([EV-TECH-005](../05-research-evidence/evidence-index.md#ev-tech-005)).

## İşleyiş

**Erişilemedi:** Silah listesi, otomatik hedef seçimi, mermi, çarpışma, durum etkileri, evrim ve pasif sinerjiler.

## Teknik bulgular

- **Kısmen doğrulanmış:** Paketlenmiş ses varlıklarında `sfx_treasure_*`, `sfx_death` ve çok sayıda etkisel ses anahtarı bulunur. Bunlar tetikleyici sıklığını, savaş formülünü veya oyuncu tarafından erişilebilirliği kanıtlamaz.

## Parametreler ve formüller

Erişilemedi. Ölçümlü tur deneyi olmadan saldırı aralığı/hasar/alan değerleri verilmeyecek.

## Diğer sistemlerle ilişkiler

Savaş verileri için Addressables katalog, IL2CPP metadata ve HUD deneyi ayrı kanıt kanalları olarak kullanılacaktır.

## Kanıtlar

`EV-TECH-005`.

## Güven düzeyi

Varlık anahtarları için **Kısmen doğrulanmış**; savaş davranışı için **Erişilemedi**.

## Bilinmeyenler

Tüm erişilebilir silahlar, seviye/evolüsyon şartları, hasar formülleri, hedefleme ve mermi ömrü.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

**Hipotez:** Savaş kuralları, sunum varlıkları ve ses tetikleyicileri ayrı veri katmanlarında tutulursa dengeleme ve içerik üretimi ayrışır. Bu, referans koddan değil paketleme gözleminden türetilmiş bir tasarım hipotezidir.

## İlgili belgeler

[Düşmanlar](enemies-bosses-and-difficulty.md) · [Veri hattı](../04-technical-analysis/assets-and-data-pipeline.md)
