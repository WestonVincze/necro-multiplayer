import { StatName } from "../components";
import { type UnitData, Faction, UnitName } from "../types";

export const Units: Record<UnitName, UnitData> = {
  [UnitName.Peasant]: {
    name: "Peasant",
    type: Faction.Crown,
    url: "peasant.png",
    width: 45,
    height: 110,
    expReward: 8,
    stats: {
      [StatName.MaxHealth]: 5,
      [StatName.Armor]: 8,
      [StatName.AttackBonus]: 2,
      [StatName.AttackSpeed]: 8,
      [StatName.AttackRange]: 20,
      [StatName.MaxHit]: 1,
      [StatName.DamageBonus]: 0,
      [StatName.MoveSpeed]: 0.35,
      [StatName.MaxMoveSpeed]: 1.2,
    },
    dropTable: {
      always: ["bones"],
    },
  },
  [UnitName.Guard]: {
    name: "Guard",
    type: Faction.Crown,
    url: "guard.png",
    width: 50,
    height: 110,
    expReward: 12,
    stats: {
      [StatName.MaxHealth]: 15,
      [StatName.Armor]: 12,
      [StatName.AttackBonus]: 6,
      [StatName.AttackSpeed]: 4,
      [StatName.AttackRange]: 20,
      [StatName.MaxHit]: 4,
      [StatName.DamageBonus]: 0,
      [StatName.MoveSpeed]: 0.3,
      [StatName.MaxMoveSpeed]: 1,
      [StatName.CritChance]: 5,
      [StatName.CritDamage]: 2,
    },
    dropTable: {
      always: ["bones"],
      common: ["med_helm"],
    },
  },
  [UnitName.Paladin]: {
    name: "Paladin",
    type: Faction.Crown,
    url: "paladin.png",
    width: 60,
    height: 110,
    expReward: 25,
    stats: {
      [StatName.MaxHealth]: 30,
      [StatName.Armor]: 16,
      [StatName.AttackBonus]: 8,
      [StatName.AttackSpeed]: 8,
      [StatName.AttackRange]: 30,
      [StatName.MaxHit]: 6,
      [StatName.DamageBonus]: 1,
      [StatName.MoveSpeed]: 0.2,
      [StatName.MaxMoveSpeed]: 0.5,
      [StatName.CritChance]: 5,
      [StatName.CritDamage]: 2,
    },
    dropTable: {
      always: ["bones"],
      common: ["bucket_helm"],
    },
  },
  [UnitName.Doppelsoldner]: {
    name: "Doppelsoldner",
    type: Faction.Crown,
    url: "doppelsoldner.png",
    width: 60,
    height: 120,
    expReward: 30,
    stats: {
      [StatName.MaxHealth]: 40,
      [StatName.Armor]: 14,
      [StatName.AttackBonus]: 10,
      [StatName.AttackSpeed]: 8,
      [StatName.AttackRange]: 60,
      [StatName.MaxHit]: 12,
      [StatName.DamageBonus]: 3,
      [StatName.MoveSpeed]: 0.5,
      [StatName.MaxMoveSpeed]: 1.2,
      [StatName.CritChance]: 25,
      [StatName.CritDamage]: 2,
    },
    dropTable: {
      always: ["bones"],
      common: ["great_sword"],
    },
  },
  [UnitName.Archer]: {
    name: "Archer",
    type: Faction.Crown,
    url: "archer.png",
    width: 60,
    height: 110,
    expReward: 30,
    ranged: true,
    stats: {
      [StatName.MaxHealth]: 30,
      [StatName.Armor]: 16,
      [StatName.MoveSpeed]: 0.6,
      [StatName.MaxMoveSpeed]: 1.3,
      [StatName.CritChance]: 25,
      [StatName.CritDamage]: 2,
      [StatName.AttackRange]: 300,
      [StatName.AttackBonus]: 5,
      [StatName.AttackSpeed]: 20,
      [StatName.DamageBonus]: 1,
      [StatName.MaxHit]: 8,
    },
    dropTable: {
      always: ["bones"],
      common: ["crossbow"],
    },
  },
  [UnitName.Skeleton]: {
    name: "Skeleton",
    type: Faction.Necro,
    url: "skele.png",
    width: 40,
    height: 60,
    stats: {
      [StatName.MaxHealth]: 8,
      [StatName.Armor]: 8,
      [StatName.MaxHit]: 2,
      [StatName.AttackBonus]: 4,
      [StatName.AttackSpeed]: 5,
      [StatName.AttackRange]: 20,
      [StatName.DamageBonus]: 0,
      [StatName.MoveSpeed]: 0.5,
      [StatName.MaxMoveSpeed]: 1.5,
      [StatName.CritChance]: 5,
      [StatName.CritDamage]: 1.5,
    },
  },
  [UnitName.Necromancer]: {
    name: "Necromancer",
    type: Faction.Necro,
    url: "necro.png",
    width: 50,
    height: 114,
    stats: {
      [StatName.MaxHealth]: 20,
      [StatName.Armor]: 10,
      [StatName.MoveSpeed]: 0.8,
      [StatName.MaxMoveSpeed]: 2,
      [StatName.HealthRegeneration]: 0.05,
      [StatName.CastingSpeed]: 0.5,
      [StatName.CastingRange]: 50,
    },
  },
};
