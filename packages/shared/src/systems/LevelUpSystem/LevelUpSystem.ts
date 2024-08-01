import { Experience, Level, UpgradeRequest } from "../../components";
import { addComponent, defineQuery, removeComponent } from "bitecs";
import { getRandomElements } from "../../helpers";
import { BASE_EXP, MAX_LEVEL } from "../../constants";
import { StatUpgrades } from "../../data";

/**
 * query for entities with "Level" and "Experience" components
 * add "experience" to levelProgress
 * if next level is achieved, increment level, set new threshold
 * remove experience component
 *
 */
export const createLevelUpSystem = () => {
  const query = defineQuery([Level, Experience]);

  return (world: World) => {
    for (const eid of query(world)) {
      const newExperience = Level.currentExp[eid] + Experience.amount[eid];

      if (
        Level.expToNextLevel[eid] > 0 &&
        newExperience >= Level.expToNextLevel[eid]
      ) {
        Level.currentLevel[eid] += 1;

        // set currentExp to the remaining exp
        Level.currentExp[eid] = newExperience - Level.expToNextLevel[eid];

        Level.expToNextLevel[eid] = getExpForNextLevel(Level.currentLevel[eid]);

        addComponent(world, UpgradeRequest, eid);
        UpgradeRequest[eid] = {
          upgrades: getRandomElements(StatUpgrades, 3),
        };
      } else {
        Level.currentExp[eid] = newExperience;
      }

      removeComponent(world, Experience, eid);
    }

    return world;
  };
};

/**
 * @param world bitECS world
 * @param eid entity ID
 * @param experience experience to add
 */
export const giveExpToEntity = (
  world: World,
  eid: number,
  experience: number,
) => {
  try {
    addComponent(world, Experience, eid);
    Experience.amount[eid] = experience;
  } catch (e) {
    console.warn(e);
  }
};

/**
 * @param currentLevel the current level of the entity
 * @returns the total experience required to reach the next level, or 0 if already at max level
 */
export const getExpForNextLevel = (currentLevel: number) => {
  if (currentLevel >= MAX_LEVEL) return 0;
  return BASE_EXP + currentLevel * 10;
};
