# IL2CPP Metadata Sistem Haritası

> Durum: **Doğrulanmış (yapısal metadata)**. Bu belge yalnızca aşağıdaki REA
> kanıt demetindeki `records[0].normalized_result` tablosundan türetilmiştir.
> Metod gövdeleri, native adres eşlemesi ve çalışma zamanı izleri bu kanıtta
> yoktur. Bu nedenle metod adı/alan adı, metodun çağrıldığı veya davranışın
> kesinlikle o adın anlattığı biçimde gerçekleştiği anlamına gelmez.

## Kanıt ve sınır

- **Kanıt kimliği:** `EVD-IL2CPP-META-20261023` (REA üst-kayıt:
  `ev_c937f97601e0d50315941dbbf017306d2b3499d17d2fd44b1811ccc0261351ee`)
- **Kaynak demet:**
  [`il2cpp-metadata-evidence-20261023.json`](../05-research-evidence/artifacts/il2cpp-metadata-evidence-20261023.json)
- **Özgün hedef:** `B:\Steam\steamapps\common\Vampire Survivors\VampireSurvivors_Data\il2cpp_data\Metadata\global-metadata.dat`
- **Özgün metadata SHA-256:** `ebc951fb2ade1ee2822ab0565d07108667d1fd608f47512a05e94d7d9043cc2a`
- **Sürüm/ölçek:** IL2CPP metadata sürümü 31; 179 image, 42.100 tür, 332.115
  metod ve 172.507 alan REA tarafından ayrıştırılmıştır.
- **Yöntem:** Demetteki type/method/field dizileri, sabit metadata indeksleri
  üzerinden salt-okunur sorgulandı. Bir "metod indeksi" burada metadata
  `methods[]` satırını ifade eder; native kod adresi değildir.

## En önemli düğümler

| Konu | Tür indeksi ve tam tür adı | Metadata ile doğrulanan üyeler | Güven / sınır |
|---|---|---|---|
| Oturum orkestrasyonu | **[16144]** `VampireSurvivors.Framework.GameManager` | Alanlar: `_stage`, `_lootManager`, `_levelUpFactory`, `_treasureFactory`, `_gemsToSpawn`, `_coinsToSpawn`, `_waitingForLevelUp`, `_nextLevelUpAtLevel`, `ExperienceMultiplier`, `EnemyHealthMultiplier`, `EnemySpeedMultiplier`. Metod adları: **[117014]** `RunLocalOrOnlineLevelUp`, **[117118]** `AddPlayerXp`, **[117250]** `SpawnGems`, **[117252]** `SpawnPickups`, **[117282]** `GetLevelUpChoices`, **[117283]** `ApplyOfflineLevelUp`, **[117310]** `GetKillRatio`. | **Doğrulanmış:** bu üyeler aynı türde mevcuttur. **Erişilemedi:** çağrı sırası, katsayı formülleri ve koşullar. |
| Oyuncu/karakter çalışma durumu | **[15407]** `VampireSurvivors.Objects.Characters.CharacterController` | Alanlar: `_currentHp`, `_level`, `_xp`, `_weaponsManager`, `_currentCharacterData`, `_invincibilityTimer`, `_magnet`, `_maxWeaponCount`, `_isDead`. Metod adları: **[111563]** `LevelUp`, **[111573]** `AddXp`, **[111574]** `GetDamaged`, **[111622]** `ApplyWeaponLevelUp`, **[111628]** `SetHealth`, **[111629]** `Kill`, **[111670]** `ProcessMovementVector`, **[111677]** `UpdateMagnet`, **[111720]** `DoesWantPickup`, **[111721]** `OnPickupCollected`. | **Doğrulanmış:** alan/metod varlığı. **Erişilemedi:** XP eşiği, hasar hesabı, hareket denklemi. |
| Seviye-atlama durumları | **[12023]** `VampireSurvivors.GameStateLevelUp`; **[12036]** `VampireSurvivors.GameStateWeaponSelection` | Her iki türde `OnEnter`/`OnExit`; ilkinde `ReturnToGame`, ikincisinde `Complete`. `GameManager` ayrıca reroll/banish/skip adlı metodlar içerir: **[117131]**, **[117132]**, **[117230]**, **[117231]**. | **Kısmen doğrulanmış:** ayrı oyun-durumu türleri ve seçenek işleme adları vardır. Ekran akışı ve seçim ağırlıkları bilinmez. |
| Silah envanteri | **[13119]** `CharacterWeaponsManager`; **[13120]** `EquipmentManager` | `CharacterWeaponsManager`: `_maxActiveCount`, `_maxHiddenCount`, `SetMaxWeaponCount`, `NotifyOwnerLevelUp`, `GetWeaponByType`. `EquipmentManager`: `ActiveEquipment`, `HiddenEquipment`, kaldırılmış koleksiyonlar, `LevelUpAllActiveEquipment`, `AddEquipment`, `RemoveEquipment`. | **Doğrulanmış:** aktif/gizli ekipman ayrımı ve seviye-atlama üyeleri. Kapasite kuralları bilinmez. |
| Sahne ve spawn | **[13150]** `VampireSurvivors.Objects.Stage` | Alanlar: `_currentMinute`, `_effectiveSpawnFrequency`, `_spawnTimer`, `_enemyPoolStates`, `_bossPoolStates`, `_enemyTypes`, `_bossTypes`, `EnemyHealthMultiplier`, `EnemySpeedMultiplier`. Metod adları: **[94521–94523]** `SpawnEnemy*`, **[94536]** `StartTimers`, **[94599]** `UpdateMinuteData`, **[94603]** `GetAverageXPYieldPerWave`, **[94604]** `UpdateEnemyPools`, **[94627]** `HandleSpawning`, **[94629–94634]** spawn seçimi/verisi, **[94641]** `SpawnBoss`, **[94659–94660]** culling. | **Doğrulanmış:** zaman, havuz, spawn ve culling için metadata yüzeyi vardır. **Erişilemedi:** dakika tablosu, frekans/HP/hız formülleri. |
| Zamanlı sahne olayı | **[13194]** `VampireSurvivors.Objects.StageEventManager` | `RandomEventId`, `_playDiamondDuration`, `_stageEventsDisabled`, `_eventTargets`; metod adları `GenerateEnemySwarm`, `GenerateEnemyWall`, `SummonTimedEnemy`, `SpawnInSteps`, `SpawnCircleWave`, `fnUltraWave`. | **Kısmen doğrulanmış:** ayrı olay yöneticisi ve olay adları. Tetik koşulları/parametreler bilinmez. |
| Düşman çalışma durumu | **[15841]** `VampireSurvivors.Objects.Characters.EnemyController` | Alanlar: `_currentEnemyData`, `_hp`, `_maxHp`, `_hpXLevel`, `_defaultSpeed`, `_treasure`, `_deathRng`, `_enemyType`, `StageEventId`, `IsDead`. Metod adları: **[114582]** `InitEnemy`, **[114583]** `UpdateBaseHealth`, **[114589]** `AttachTreasure`, **[114597]** `IsBossEnemy`, **[114619]** `GetDamaged`, **[114626–114630]** HP üyeleri, **[114650]** `GetEnemyDataForCurrentLevel`, **[114656–114658]** ödül üyeleri. | **Doğrulanmış:** veri, HP, hız, hazine ve ödül adları aynı sınıfta. **Erişilemedi:** AI kararları ve ölçekleme formülü. |
| Pickup | **[14256]** `VampireSurvivors.Objects.Pickups.Pickup`; **[14263]** `PickupManager` | `Pickup`: `Radius`, `DefaultSpeed`, `Value`, `Speed`, `FeverMS`, `IsStagePickup`, `PickupType`; metodlar `CanCharacterCollectPickup`, `Despawn`, `GiveReward`. `PickupManager`: `CreatePickup`, `ReturnPickup`, `GeneratePools`, `GetPool`. | **Doğrulanmış:** pickup değer/hız/ödül/pool metadata yüzeyi. Hangi pickup'ın hangi XP veya ödülü verdiği bilinmez. |
| Loot/weighted seçim | **[17079]** `VampireSurvivors.Framework.Loot.LootManager`; **[17080–17082]** weighted türleri | `LootManager` alanları: `_stage`, `_forcedLootTable`, `_addedLoot`; metodlar: `SetPlainLootTable`, `AddToLootTable`, `RecalculateLoot`, `GetRandomWeightedItem`, `MakeDefaultLootTable`, `MakeCustomLootTable`. | **Doğrulanmış:** weighted-item tabanlı loot seçimi için ayrı türler/metod isimleri. Ağırlıklar, RNG veya drop şansı bu metadata ile kanıtlanmaz. |
| Hazine ödülleri | **[11807]** `TreasureFactory`; **[17303]** `Data.Stage.Treasure` | Factory alanları `_accumulatedWeaponPrizes`, `_accumulatedWorldSpacePrizes`, `_accumulatedCoinPrize`, `_coinsAward`, `_prizes`; `GenerateNewPrizes`, `MakePrizes`, `GetCoins`. `Treasure` verisinde `chances`, `prizeTypes`, `fixedPrizes`, `hasArcana`, `hasRandoms`, `accumulatedCoinPrize`; metodları `ClaimPrizes`, `SpawnWorldSpaceWeapon`. | **Doğrulanmış:** ödül türü/chance/fixed/random alanları vardır. Hazine olasılıkları ve sıra algoritması bilinmez. |

## Veri şeması ve JSON-partisyon işaretleri

**[17239]** `VampireSurvivors.Data.DataManager` içinde `_allWeaponDataJson`,
`_allCharactersJson`, `_allEnemiesJson`, `_allItemsJson`, `_allPowerUpsJson`,
`_allPropsJson`, `_allStagesJson`, `_allArcanasJson`, `_allLimitBreakDataJson`,
`_allAchievementsJson`, `_allSecretsJson`, `_allAdventuresJson` ve
`_allStageSetJson` alanları görülür. Aynı türde
`JsonPartFileNameWeapon`, `JsonPartFileNameCharacter`, `JsonPartFileNameEnemy`,
`JsonPartFileNameItem`, `JsonPartFileNamePowerUp`, `JsonPartFileNameStage`,
`JsonPartFileNameArcana`, `JsonPartFileNameLimitBreak` vb. alanlar da vardır.

Bu, veri katmanının bu içerik aileleri için JSON-partisyon kavramını taşıdığını
**doğrular**. Ancak bu kanıt demeti alanların *değerlerini* ve paketteki gerçek
JSON dosya yollarını vermez; örneğin `JsonPartFileNameWeapon`'ın dosya adı bu
belgeden çıkarılamaz. Gerçek key/value için Unity varlık çıkarımına ait ayrı
kanıt kullanılmalıdır.

Temel içerik şemaları ayrıca şunlardır:

| Tür | İndeks | Doğrulanmış alan örnekleri | Formül/gerçek satır değeri |
|---|---:|---|---|
| `Data.Weapons.WeaponData` | 17293 | `level`, `evoInto`, `evoSynergy`, `requires`, `requiresMax`, `rarity`, `interval`, `duration`, `power`, `area`, `speed`, `amount`, `cooldown`, `dropRateAffectedByLuck` | **Erişilemedi** |
| `Data.Enemies.EnemyData` | 17312 | `maxHp`, `speed`, `power`, `minimumHpScalingLevel`, `maximumHpScalingLevel`, `xp`, `fireDelay`, `fireDelayRandomness`, `firingRangeMin/Max` | **Erişilemedi** |
| `Data.Characters.CharacterData` | 17316 | `startingWeapon`, `maxHp`, `armor`, `moveSpeed`, `power`, `area`, `duration`, `amount`, `luck`, `growth`, `greed`, `magnet`, `reRolls`, `skips`, `banish`, `levelUpPresets` | **Erişilemedi** |
| `Data.Stage.StageData` | 17308 | `minute`, `randomMinutes`, `frequency`, `spawnMax`, `enemies`, `bosses`, `treasure`, `events`, `LootTable`, `spawnType`, `startingSpawns` | **Erişilemedi** |
| `Data.PowerUp.PowerUpData` | 17309 | `level`, `price`, `unlockedRank`, `isPowerUp`, `isAnUnlockable` | **Erişilemedi** |
| `Data.Items.ItemData` | 17311 | `pickedupAmount`, `rarity`, `unlocksAt`, `value`, `inTreasures`, `isRare`, `requiresItem`, `requiresArcana`, `excludeFromDefaultLootTable` | **Erişilemedi** |

## Güvenli sistem ilişkisi haritası

Bu şema yalnızca aynı metadata kaydında görünen tür/alan/metod adlarının
bağlantısını ifade eder; kontrol akışı değildir.

```text
DataManager [17239]
  ├─ WeaponData [17293] / CharacterData [17316]
  ├─ EnemyData [17312] / StageData [17308]
  └─ ItemData [17311] / PowerUpData [17309]

GameManager [16144]
  ├─ Stage [13150] ── EnemyController [15841]
  ├─ CharacterController [15407] ── CharacterWeaponsManager [13119]
  ├─ Pickup / PickupManager [14256, 14263]
  ├─ LootManager [17079]
  └─ TreasureFactory [11807]
```

## Sonraki doğrulanabilir sorgular

1. Unity çıkarımındaki gerçek JSON tablolarından `WeaponData`, `EnemyData`,
   `StageData`, `CharacterData`, `ItemData` ve level-up presetlerinin key/value
   kayıtlarını JSON pointer ile alın; metadata alan adlarını değer kanıtı yerine
   kullanmayın.
2. Native `GameAssembly.dll` ve bu metadata aynı build olarak bağlanabildiğinde
   yukarıdaki kritik metodların (**[117282]**, **[117283]**, **[117118]**,
   **[94604]**, **[94627]**, **[114583]**, **[152364]**) çağrı grafiği ve
   pseudocode'u incelenmelidir.
3. Kontrollü çalışma zamanı testleriyle `AddXp`/`LevelUp`, spawn frekansı,
   `GetRandomWeightedItem` ve hazine ödüllerinin ölçümü yapılmalıdır. Bu
   metadata kaydı tek başına bu davranışları ya da sayısal formülleri kanıtlamaz.
