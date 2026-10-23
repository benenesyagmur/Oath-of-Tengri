# Silah parametreleri ve seviye kayıtları

## Genel bakış

**Doğrulanmış — EV-DATA-002:** `resources.assets`, TextAsset `WEAPON_DATA`, path_id `322`, 153 anahtar içerir. Bunların 26'sında ilk satır `isPowerUp:true`; dolayısıyla 153 sayısı doğrudan saldırı silahı sayısı değildir. Tüm paketlerdeki 526 kayıt/489 benzersiz anahtar için [türetilmiş indeks](../../05-research-evidence/artifacts/unity-data/weapons-derived-index.json) bulunur. Tam erişilebilir silah listesi henüz doğrulanmadı.

## İşleyiş

Her anahtarın değeri çoğunlukla bir satır dizisidir: ilk satır açıklama, başlangıç özellikleri ve bağlantıları; sonraki satırlar az sayıda özellik içerir. **Çıkarım:** sonraki satırlar seviye farklarıdır. Bu yorumu sayısal işaretler ve son satırdaki evrim işareti destekler; toplama/atama mantığı için metot gövdesi gerekir.

## Teknik bulgular / parametreler

Kaynak [WEAPON_DATA](../../05-research-evidence/artifacts/unity-data/resources__322__WEAPON_DATA.json); aşağıdaki yollar JSON pointer'dır. Değerler hamdır, saniye veya gerçek hasar olarak etiketlenmez.

| Yol | interval | repeatInterval | power | area | amount | poolLimit |
|---|---:|---:|---:|---:|---:|---:|
| `/WHIP/0` | 1350 | 100 | 1 | 1 | 1 | 30 |
| `/MAGIC_MISSILE/0` | 1200 | 100 | 1 | 1 | 1 | 60 |
| `/VAMPIRICA/0` | 1350 | 100 | 4 | 1.3 | 2 | 30 |

`WHIP` dizisinde 8 satır: indeks 1 `amount:+1`; 2–7 `power:+0.5`; 3 ve 5 ayrıca `area:+0.1`; 7 `addEvolvedWeapon:VAMPIRICA`. `MAGIC_MISSILE` dizisinde 8 satır: 1/3/5 `amount:+1`, 2 `interval:-200`, 4/7 `power:+1`, 6 `penetrating:+1`, 7 `addEvolvedWeapon:HOLY_MISSILE`.

**Hipotez:** farklar toplamsal uygulanıyorsa WHIP 8. satır sonunda power=4, area=1.2, amount=2; MAGIC_MISSILE interval=1000, power=3, amount=4, penetrating=2 olur. Bunlar doğrulanmış runtime sonuçları veya tam hasar formülleri değildir; karakter, kalıcı yükseltme, arcana, minimum sınırlar ve mermi davranışı ayrıca incelenmelidir.

`WHIP/0/critChance=0.2`, `critMul=2` bulunması, her normal vuruşun gerçekten %20 kritik olabileceğini kanıtlamaz: kritik mekanizmasının etkinleştirme koşulu çözülmedi. `poolLimit` alanından nesne havuzunun gerçek kapasitesini/performance etkisini de henüz çıkarmıyoruz.

## Diğer sistemlerle ilişkiler

Karakter `startingWeapon` anahtarı bu tabloya başvurur; `evoInto`, `evoSynergy`, `requires` bağlantıları [evrim belgesinde](evolutions-and-passives.md). Silah açıklaması MAGIC_MISSILE için yakın düşmanı hedeflediğini söyler; bu **Kısmen doğrulanmış** tasarım beyanıdır, hedef seçme algoritması ölçülmedi.

## Kanıtlar ve güven düzeyi

EV-DATA-001/002. Ham TextAsset SHA-256 `408ee45524cfac4e84a61c997d79fea0b8f9c8677cd3f742ae32fdc9aa2058b2`. Kaynak, normalize JSON hash'i ve parser [envanterde](../../05-research-evidence/artifacts/unity-data/inventory.json). Tablo değerleri **Doğrulanmış**, runtime davranış **Erişilemedi**.

## Bilinmeyenler / deney planı

Interval birimi ve cooldown çarpanı; ilk atış gecikmesi; salvolar arası/salvo içi zaman; base damage katsayısı; kritik kapısı; çarpışma tekrar süresi; delme/sekme; en yakın hedefte eşit uzaklık kuralı. İzole test: tek karakter+tek silah, kalıcı güçler/arcana kapalı olduğu belgelenmiş durum, sabit seviye, en az 30 atış başlangıcı zaman damgası; ölçümleri kaynak interval'iyle karşılaştır. Kullanıcının mevcut koşusu kontrollü deney sayılmayacak.

## Özgün oyunda uygulanabilecek tasarım ilkeleri

**Çıkarım:** saldırı periyodu, salvo aralığı ve mermi sayısını ayrı parametreler olarak modellemek farklı ritimler üretir. Verideki sayı veya içerikler kopyalanmadan özgün saldırılarla denenebilir.

## İlgili belgeler

[Savaş üst belgesi](../weapons-and-combat.md) · [Veri çıkarımı](../../04-technical-analysis/data-extraction.md)
