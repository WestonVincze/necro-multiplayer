import { Types, defineComponent } from "bitecs";

/**
 * represents the current state of an AI entity (behavior)
 */
export const AI = defineComponent({
  type: Types.ui8,
  state: Types.ui8,
  // TODO: add AI configuration data (like flee_at_hp_percent)
});

/**
 * AIGoal represents a specific objective or action - not yet used (may not ever be)
 */
export const AIGoal = defineComponent({
  goalType: Types.ui8, // TODO: create enum with various goal types (none, moveTo, attack, etc...)
  // various goal data (x, y, etc...)
});

export const AIConfig = defineComponent({
  fleeThreshold: Types.f32,
  // cooldowns?
  // chaseDistance?
});

export const AIAction = defineComponent({
  currentAction: Types.ui8,
  lastUtilityCalc: Types.f32,
  // cachedUtilities?
  // frameSinceLastCalculation: Types.ui16
});
