# Oyuncu ve Karakter Sistemi

## Genel bakış

Katalogda birçok `character` ve `characterprefab` varlık etiketi gözlenmiştir. Bu, karakterle ilişkili adreslenebilir içeriklerin bulunduğunu gösterir; karakter istatistikleri, hareket modeli, kilit koşulları veya özel güçler çıkarılamaz ([EV-TECH-005](../05-research-evidence/evidence-index.md#ev-tech-005)).

## İşleyiş / teknik bulgular

- **Kısmen doğrulanmış:** Karaktere özgü varlık anahtarları ve prefab anahtarları, sürümden bağımsız bir içerik paketleme biçiminde yer alır.
- **Erişilemedi:** Hareket hızı, kontroller, çarpışma, sağlık/hasar/ölüm ve karakter başlangıç değerleri.

## Parametreler ve formüller

Erişilemedi.

## Diğer sistemlerle ilişkiler

Karakter paketleri, Addressables içerik hattına bağlıdır; oyun içi seçim/istatistik sistemi henüz kanıtlanmadı.

## Kanıtlar

`EV-TECH-005`.

## Güven düzeyi

Paket varlığı için **Kısmen doğrulanmış**; mekanikler için **Erişilemedi**.

## Bilinmeyenler

Başlangıç silahları, istatistik farklılıkları, açma koşulları, kontrol şeması.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

**Çıkarım:** Karakter mantığından bağımsız adreslenebilir sunum/prefab paketleri, ek içerik yüklemesini modüler tutabilir. Bu yalnızca teknik ayrıştırma fikridir; özgün adlar, görseller ve varlıklar kullanılmamalıdır.

## İlgili belgeler

[Varlık hattı](../04-technical-analysis/assets-and-data-pipeline.md)
