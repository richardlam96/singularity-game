import { MissileControls } from "./controls/missile-controls";
import { PlayerControls } from "./controls/player-controls";
import { CollisionSystem } from "./systems/collision-system";
import { InputControlsSystem } from "./systems/input-controls-system";
import { HitboxSystem } from "./systems/hitbox-system";
import { UISystem } from "./systems/ui-system";
import { BehaviorSystem } from "./systems/behavior-system";
import { GameObject } from "./game-objects/game-object";
import { RPGStats, PlayerRPGStats } from "./game-objects/rpg-stats";
import { PlayerHealthUI } from './ui/player-health';
import { LevelUpMenuUI } from './ui/level-up-menu';
import { RandomGenerator } from "./utilities/random-generator";
import { HalfDepthStrategy, FullBoxStrategy } from "./strategy/hitbox-strategies";

export class Game {
    constructor(params) {
        this._renderer = params.renderer;
        this.scene = params.scene;
        this.camera = params.camera;
        this.light = params.light;
        this.assetFactory = params.assetFactory;
        this.inputManager = params.inputManager;

        this.player;
        this.obstacles = [];
        this.missiles = [];
        this.inputControlsSystem;
        this.collisionSystem;
        this.hitboxSystem;
        this.behaviorSystem;
        this.uiSystem;

        this._init();
    }

    _init() {
        // Initialize player plane and obstacles.
        this.player = new GameObject({
            model: this.assetFactory.getPlane(), 
            hitboxStrategy: new HalfDepthStrategy(),
            stats: new PlayerRPGStats({
                hp: 10,
                poise: 10,
                speed: 0.2,
                turnSpeed: 0.025,
                missileDelay: 1,
                missileHealth: 1,
                missileDamage: 1,
                missileSpeed: 1,
                difficulty: 3
            })
        });
        this.scene.add(this.player.model);
        this.camera.setTarget(this.player.model);

        for (let _ = 0; _ < 10; _++) {
            let cube = new GameObject({
                model: this.assetFactory.getCube(), 
                hitboxStrategy: new FullBoxStrategy(),
                stats: new RPGStats({
                    hp: this.player.stats.difficulty,
                    poise: this.player.stats.difficulty
                })
            });
            let x = RandomGenerator.randIntBetween(-40, 40);
            let z = RandomGenerator.randIntBetween(-40, 40);
            cube.model.position.set(x, 0, z);
            this.scene.add(cube.model);
            this.obstacles.push(cube);
        }

        // Initialize UI Components and System.
        let playerHealth = new PlayerHealthUI();
        let levelUpMenu = new LevelUpMenuUI(this.player.stats);
        this.uiSystem = new UISystem({
            player: this.player,
            healthUI: playerHealth
        });

        // Initialize the InputControlsSystem and pair Controls with objects.
        this.inputControlsSystem = new InputControlsSystem({
            inputManager: this.inputManager,
            controls: [
                new PlayerControls(this.inputManager, this.player),
                new MissileControls({
                    scene: this.scene,
                    inputManager: this.inputManager,
                    assetFactory: this.assetFactory,
                    missiles: this.missiles,
                    player: this.player
                })
            ]
        });

        // Initialize Hitbox System.
        this.hitboxSystem = new HitboxSystem({
            player: this.player,
            missiles: this.missiles,
            obstacles: this.obstacles
        });

        // Initialize the Collision System with the game objects.
        this.collisionSystem = new CollisionSystem({
            player: this.player,
            missiles: this.missiles,
            obstacles: this.obstacles
        });

        // Initialize the Behavior System for missiles.
        this.behaviorSystem = new BehaviorSystem(this.missiles);
    }

    update(timeElapsed) {
        this.camera.update();
        this.inputControlsSystem.update(timeElapsed);
        this.hitboxSystem.update();
        this.collisionSystem.update();
        this.behaviorSystem.update();
        this.uiSystem.update();
    }

    render = (timeElapsed) => {
        requestAnimationFrame(this.render);
        timeElapsed *= 0.001;
        this.update(timeElapsed);
        this._renderer.render(this.scene, this.camera._camera);
    }
}