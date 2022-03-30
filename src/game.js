import { MissileControls } from "./controls/missile-controls";
import { PlayerControls } from "./controls/player-controls";
import { CollisionSystem } from "./systems/collision-system";
import { InputControlsSystem } from "./systems/input-controls-system";
import { HitboxSystem } from "./systems/hitbox-system";
import { UISystem } from "./systems/ui-system";
import { BehaviorSystem } from "./systems/behavior-system";
import { GameObject } from "./game-objects/game-object";
import { RPGStats, PlayerObjectStats } from "./game-objects/rpg-stats";
import { PlayerHealthUI } from './ui/player-health';
import { LevelUpMenuUI } from './ui/level-up-menu';
import { RandomGenerator } from "./utilities/random-generator";
import { HalfDepthStrategy, FullBoxStrategy } from "./strategy/hitbox-strategies";

const STARTING_STATS = {
    hp: 10,
    poise: 10,
    speed: 0.2,
    turnSpeed: 0.025,
    missileDelay: 1,
    missileHealth: 1,
    missileDamage: 1,
    missileSpeed: 1,
    difficulty: 3
};

export class Game {
    constructor(params) {
        this._renderer = params.renderer;
        this.scene = params.scene;
        this.camera = params.camera;
        this.light = params.light;
        this.assetFactory = params.assetFactory;
        this.inputManager = params.inputManager;

        this.currentPlaythroughStats;
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

    _initGameStats() {
        this.currentPlaythroughStats = Object.assign({}, STARTING_STATS);
    }

    _init() {
        this._initGameStats();
        this.start(this.currentPlaythroughStats);
    }

    startNextLevel = (playthroughStats) => {
        this.clean();
        playthroughStats.difficulty += 1;
        this.start(playthroughStats);
    }

    start(playthroughStats) {
        this._initPlayer(playthroughStats);
        this._initObstacles(playthroughStats);
        this._initSystems(playthroughStats);
    }

    clean() {
        this.player.model.removeFromParent();
        this.obstacles.forEach(obstacle => obstacle.model.removeFromParent());
        this.missiles.forEach(missile => missile.model.removeFromParent());
        this.uiSystem.clean();

        this.player = null;
        this.obstacles = [];
        this.missiles = [];
    }

    _initPlayer(playthroughStats) {
        // Initialize player plane and obstacles.
        this.player = new GameObject({
            model: this.assetFactory.getPlane(), 
            hitboxStrategy: new HalfDepthStrategy(),
            stats: new PlayerObjectStats({
                hp: playthroughStats.hp,
                poise: playthroughStats.poise,
                speed: playthroughStats.speed,
                turnSpeed: playthroughStats.turnSpeed
            })
        });
        this.scene.add(this.player.model);
        this.camera.setTarget(this.player.model);
    }

    _initObstacles(playthroughStats) {
        for (let _ = 0; _ < 10; _++) {
            let cube = new GameObject({
                model: this.assetFactory.getCube(), 
                hitboxStrategy: new FullBoxStrategy(),
                stats: new RPGStats({
                    hp: playthroughStats.difficulty,
                    poise: playthroughStats.difficulty
                })
            });
            let x = RandomGenerator.randIntBetween(-40, 40);
            let z = RandomGenerator.randIntBetween(-40, 40);
            cube.model.position.set(x, 0, z);
            this.scene.add(cube.model);
            this.obstacles.push(cube);
        }
    }

    _initSystems(playthroughStats) {
        // Initialize UI Components and System.
        this.uiSystem = new UISystem({
            stats: playthroughStats,
            healthUI: new PlayerHealthUI(),
            levelUpUI: new LevelUpMenuUI(),
            onClick: this.startNextLevel
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
                    missileStats: {
                        hp: playthroughStats.missileHealth,
                        poise: playthroughStats.missileDamage,
                        speed: playthroughStats.missileSpeed,
                        delay: playthroughStats.missileDelay
                    },
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