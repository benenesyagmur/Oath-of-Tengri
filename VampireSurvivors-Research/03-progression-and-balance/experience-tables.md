# Deneyim ve karaktere bağlı seviye kayıtları

> Durum: **Doğrulanmış (veri kaydı)** / **Erişilemedi (XP eşiği ve uygulama
> kuralı)**. Bu belge yalnızca çıkarılmış `CHARACTER_DATA` TextAsset'inin
> gerçek JSON değerlerini kaydeder; oyunun bu kayıtları ne zaman ve nasıl
> uyguladığını iddia etmez.

## Kanıt

- **Kanıt kimliği:** `EV-DATA-005`
- **Asset envanteri:**
  [`inventory.json`](../05-research-evidence/artifacts/unity-data/inventory.json)
- **Çıkarılan JSON:**
  [`resources__332__CHARACTER_DATA.json`](../05-research-evidence/artifacts/unity-data/resources__332__CHARACTER_DATA.json)
- **Özgün asset:** `B:\Steam\steamapps\common\Vampire Survivors\VampireSurvivors_Data\resources.assets`,
  TextAsset `CHARACTER_DATA`, `path_id: 332`.
- **Özgün TextAsset SHA-256:** `707f47aa877ebd1232ea18ef950cb1186f5233f877385b074cc80d1afd5bc5f4`
- **Çıkarılmış/ayrıştırılmış JSON SHA-256:**
  `535c99a1848ee16e347aafa93f7d0b80e762fd2e75ccc68c5dea8f18f20ea644`
- **Yöntem:** JSON nesne sayımı, JSON pointer ile seçilmiş kayıtların salt
  okunur incelenmesi. Kaynak JSON geçerli standart JSON olarak ayrıştırılmıştır.

## Yapı ve sayımlar

**Doğrulanmış:** Kök nesnede 70 karakter anahtarı vardır. Her anahtarın değeri
bir kayıt dizisidir. Dizilerdeki ilk kayıt temel karakter verisini, sonraki
kayıtlar ise `level` alanı ile birlikte bir veya daha çok değiştirici alanı
taşır. Bu yapısal tanım, bu ek kayıtların çalışma zamanında toplandığını,
üstüne yazıldığını ya da başka bir biçimde uygulandığını tek başına kanıtlamaz.

- Temel karakter anahtarı: **70**
- En az bir ek kayıt içeren anahtar: **69** (`FINO` bu dosyada yalnız ilk
  kayda sahiptir.)
- İlk kayıttan sonraki toplam kayıt: **351**; bunların her birinde `level`
  alanı vardır.
- Ek kayıtların `level` dağılımı:

| `level` | Kayıt sayısı | `level` | Kayıt sayısı |
|---:|---:|---:|---:|
| 2 | 5 | 3 | 6 |
| 4 | 4 | 5 | 7 |
| 6 | 2 | 8 | 1 |
| 9 | 1 | 10 | 11 |
| 12 | 2 | 13 | 1 |
| 15 | 5 | 18 | 1 |
| 20 | 69 | 21 | 71 |
| 24 | 1 | 25 | 2 |
| 30 | 6 | 33 | 1 |
| 36 | 1 | 40 | 69 |
| 41 | 69 | 48 | 1 |
| 50 | 3 | 60 | 6 |
| 72 | 1 | 84 | 1 |
| 96 | 1 | 100 | 1 |
| 108 | 1 | 200 | 1 |

Bu sayımlar yalnızca bu temel `CHARACTER_DATA` asset'inin kapsamındadır; DLC
karakter veri asset'leri bu sayımın içinde değildir.

## JSON pointer ile örnek kayıtlar

| Pointer | Doğrudan kaydedilen değer | Etiket |
|---|---|---|
| `/ANTONIO/0` | `level: 1`, `startingWeapon: "WHIP"`, `maxHp: 120`, `moveSpeed: 1`, `power: 1`, `growth: 1`, `price: 0` | Doğrulanmış |
| `/ANTONIO/1` … `/ANTONIO/5` | Sırasıyla `level: 10,20,30,40,50` ve her birinde `power: 0.1`; `/ANTONIO/2` ve `/ANTONIO/4` ayrıca `growth: 1` | Doğrulanmış |
| `/ANTONIO/6`, `/ANTONIO/7` | Sırasıyla `{level: 21, growth: -1}` ve `{level: 41, growth: -1}` | Doğrulanmış |
| `/IMELDA/1` … `/IMELDA/3` | `{level: 5|10|15, growth: 0.1}` | Doğrulanmış |
| `/IMELDA/4`, `/IMELDA/5` | `{level: 20, growth: 1}`, `{level: 40, growth: 1}` | Doğrulanmış |
| `/PORTA/1` … `/PORTA/3` | Her biri `cooldown: 0.3`; `level` sırasıyla `2,3,4` | Doğrulanmış |
| `/CROCI/5` | `{level: 33, revivals: 1}` | Doğrulanmış |
| `/PUGNALA/0` | `level: 1`, `startingWeapon: "GUNS"`, `maxHp: 100`, `moveSpeed: 1.2`, `power: 1`, `growth: 1`, `price: 1000` | Doğrulanmış |

Alan adları (`power`, `growth`, `cooldown`, `revivals`) ve sayılar veri
değerleridir. Örneğin `0.1` değerinin toplamsal mı, çarpımsal mı olduğu;
`level` kaydının eşikte mi yoksa sonrasında mı uygulandığı bu tablodan
**çıkarılamaz**.

## XP eşiği kapsamı ve açık soru

Bu incelenen asset'te oyuncu XP'sinden bir sonraki seviyeye geçmek için gereken
sayısal eşik dizisi/formülü bulunmadı. Aynı araştırma arşivinde mevcut temel
çıkarım kapsamındaki JSON dosyalarında `nextLevel`, `xpThreshold` veya eşdeğer
isimli bağımsız bir XP-eşik tablosu doğrulanmadı. Bu, oyunda böyle bir formül
olmadığını **kanıtlamaz**: native IL2CPP kodunda hesaplanıyor, farklı bir asset
tipinde bulunuyor veya çalışma zamanında üretiliyor olabilir.

Bu sınırı destekleyen metadata işaretleri:

- `GameManager` **[16144]** alanları `_nextLevelUpAtLevel` ve
  `_waitingForLevelUp` içerir; metodları **[117118]** `AddPlayerXp`,
  **[117282]** `GetLevelUpChoices`, **[117283]** `ApplyOfflineLevelUp` olarak
  kaydedilmiştir.
- `CharacterController` **[15407]** alanları `_xp` ve `_level`, metodları
  **[111563]** `LevelUp` ve **[111573]** `AddXp` içerir.

Bunlar metadata varlığıdır, formül kanıtı değildir. Sonraki adım bu metodların
native çağrı/pseudocode incelemesi veya kontrollü XP toplama deneyidir.

## İlgili belgeler

- [IL2CPP metadata sistem haritası](../04-technical-analysis/metadata-system-map.md)
- [Loot tabloları](loot-tables.md)
- [Veri asset envanteri](../05-research-evidence/artifacts/unity-data/inventory.json)
