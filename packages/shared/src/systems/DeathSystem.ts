import { entityExists, hasComponent, removeEntity } from "bitecs";
import { gameEvents } from "../events";
import { createBonesEntity, createUnitEntity } from "../entities";
import { Necro, Position } from "../components";
import { Faction, UnitName } from "../types";
import { giveExpToEntity } from "./LevelUpSystem";

export const createDeathSystem = (faction = Faction.Necro) => {
  return (world: World) => {
    gameEvents.bufferedOnDeath.subscribe((events) => {
      for (const { eid } of events) {
        if (!entityExists(world, eid)) continue;

        const x = Position.x[eid];
        const y = Position.y[eid];

        // WORKAROUND: for testing Crown Solo mode
        if (hasComponent(world, Necro, eid)) {
          removeEntity(world, eid);
          continue;
        } else {
          giveExpToEntity(world, 1, 10);
        }

        removeEntity(world, eid);
        if (faction === Faction.Necro) {
          // TODO: spawn loot based on unit's drop table
          createBonesEntity(world, x, y);
        } else {
          createUnitEntity(world, UnitName.Skeleton, x, y);
        }
      }
    });
    return world;
  };
};
