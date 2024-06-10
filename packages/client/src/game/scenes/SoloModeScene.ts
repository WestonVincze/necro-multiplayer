import { addComponent, createWorld, getAllEntities, getEntityComponents, hasComponent, pipe } from "bitecs";
import { GameObjects, Scene, type Types } from "phaser";
import { type World, type Pipeline, Necro, Player, Position, createCursorTargetSystem, createInputHandlerSystem, createMovementSystem, createTargetingSystem, createUnitEntity, createFollowTargetSystem, createSpriteSystem, Target, Behavior, Behaviors, createCollisionSystem, createItemEquipSystem, createItemEntity, Collider, CollisionLayers, Inventory, createBonesEntity, createSpellcastingSystem, createDrawSpellEffectSystem, Spell, SpellState, createHealthBarSystem, timeSystem, createCombatSystem, createHealthSystem, FollowTarget } from "@necro-crown/shared";

export class SoloModeScene extends Scene {
  /**
   * camera
   * background
   */

  private camera!: Phaser.Cameras.Scene2D.Camera;
  private cursors!: Types.Input.Keyboard.CursorKeys;

  // entity container (context)
  private world!: World

  // system references
  private reactiveSystems!: Pipeline;
  private tickSystems!: Pipeline;
  private physicsSystems!: Pipeline;

  constructor() {
    super("SoloModeScene");
  }

  init() {
    // ensure input is enabled in config
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.camera = this.cameras.add();
  }

  rope!: GameObjects.Rope;

  create() {
    /** DEBUG CONSOLE 
    //@ts-ignore
    PhaserGUIAction(this);
    */
    console.log("creating solo mode");
    this.world = createWorld();
    this.world.time = { delta: 0, elapsed: 0, then: performance.now() };

    /** Add global debug functions */
    (window as any).getEntities = () => getAllEntities(this.world);
    (window as any).getEntityComponents = (eid: number) => getEntityComponents(this.world, eid);

    // create Necro player 
    const eid = createUnitEntity(this.world, "Necromancer", 300, 300);
    addComponent(this.world, Player, eid);
    addComponent(this.world, Collider, eid);
    addComponent(this.world, Inventory, eid);
    addComponent(this.world, Spell, eid);
    Collider.layer[eid] = CollisionLayers.ITEM;
    Collider.radius[eid] = 50;
    Spell.state[eid] = SpellState.Ready;

    // create Bones entity (for testing)
    createBonesEntity(this.world, 500, 500);

    // create Crown entities (for testing)
    for (let i = 0; i < 20; i++) {
      const eid = createUnitEntity(this.world, Math.random() > 0.5 ? "Paladin" : "Skeleton", Math.random() * 1024, Math.random() * 1024);
    }

    // create Item entity (for testing)
    createItemEntity(this.world, 20, 50, 1);

    this.physicsSystems = pipe(
      createMovementSystem(),
      createSpriteSystem(this),
      createInputHandlerSystem(this.cursors),
      createFollowTargetSystem(),
      createCombatSystem(),
      createCollisionSystem(),
      createSpellcastingSystem(),
      createDrawSpellEffectSystem(this),
      createHealthBarSystem(this),
      timeSystem
    )

    this.reactiveSystems = pipe(
      createHealthSystem(),
      createCursorTargetSystem(this.world),
      createItemEquipSystem(),
    )

    this.tickSystems = pipe(
      createTargetingSystem(),
    )

    /** REACTIVE SYSTEMS */
    this.reactiveSystems(this.world);

    /** TICK SYSTEMS */
    setInterval(() => {
      this.tickSystems(this.world);
    }, 200);
  }

  /** UPDATE LOOP SYSTEMS */
  update(time: number, delta: number): void {
    this.physicsSystems(this.world);
  }
}