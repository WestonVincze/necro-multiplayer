import { Types, defineComponent } from "bitecs";

export enum SpellState {
  Ready,
  Casting,
}

export enum SpellName {
  Summon = 1,
  HolyNova,
}

export const Spell = defineComponent({
  name: Types.ui8,
  type: Types.ui8,
  state: Types.ui8,
});

export const SpellEffect = defineComponent({
  // faction? reference to owner?
  anchor: Types.eid,
  duration: Types.f32,
  name: Types.ui8,
  size: Types.f32,
  maxSize: Types.f32,
  growthRate: Types.f32,
});

export const ResolveSpell = defineComponent();
