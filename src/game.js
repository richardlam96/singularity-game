import { MissileControls } from "./controls/missile-controls";
import { PlayerControls } from "./controls/player-controls";
import { CollisionSystem } from "./systems/collision-system";
import { InputControlsSystem } from "./systems/input-controls-system";
import { HitboxSystem } from "./systems/hitbox-system";
import { UISystem } from "./systems/ui-system";
import { BehaviorSystem } from "./systems/behavior-system";
import { BaseGameObject } from "./game-objects/game-object";
import { RPGStats, PlayerObjectStats } from "./game-objects/rpg-stats";
import { EndGameBanner } from "./ui/end-game-banner";
import { PlayerHealthUI } from './ui/player-health';
import { LevelUpMenuUI } from './ui/level-up-menu';
import { RandomGenerator } from "./utilities/random-generator";
import { HalfDepthStrategy, FullBoxStrategy } from "./strategy/hitbox-strategies";
import * as THREE from "three";
import { LivingObject } from "./game-objects/living-object";
import { ControlledObject } from "./game-objects/controlled-object";
import { Entity } from "./components/entity";
import { HitboxComponent, ModelComponent } from "./components/game-object-components";
import { PlayerInputControlsComponent } from "./components/input-controls-components";

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
    }

    _initGameStats() {
        this.currentPlaythroughStats = Object.assign({}, STARTING_STATS);
    }

    startNewGame() {
        this._initGameStats();
        this.start(this.currentPlaythroughStats);
    }

    startNextLevel = (playthroughStats) => {
        this.clean();
        playthroughStats.difficulty += 1;
        this.start(playthroughStats);
    }

    endCurrentLevel = () => {
        this.uiSystem.showLevelMenu();
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

    showEndgame() {
        this.uiSystem.showEndBanner();
    }

    end = () => {
        this.clean();
        this.startNewGame();
    }

    _initPlayer(playthroughStats) {
        this.player = new LivingObject({
            model: new ModelComponent(this.assetFactory.getPlane()),
            hitbox: new HitboxComponent(new THREE.Box3()),
            stats: new PlayerObjectStats({
                hp: playthroughStats.hp,
                poise: playthroughStats.poise,
                speed: playthroughStats.speed,
                turnSpeed: playthroughStats.turnSpeed
            }),
            inputControls: new PlayerInputControlsComponent(),
            healthbar: new PlayerHealthUI()
        });
        this.scene.add(this.player.modelComponent.model);
        this.camera.setTarget(this.player.modelComponent.model);
    }

    _initObstacles(playthroughStats) {
        for (let _ = 0; _ < 10; _++) {
            let cube = new BaseGameObject({
                model: new ModelComponent(this.assetFactory.getCube()),
                hitbox: new HitboxComponent(new THREE.Box3()),
                stats: new RPGStats({
                    hp: playthroughStats.difficulty,
                    poise: playthroughStats.difficulty
                })
            });
            let x = RandomGenerator.randIntBetween(-40, 40);
            let z = RandomGenerator.randIntBetween(-40, 40);
            cube.modelComponent.model.position.set(x, 0, z);
            this.scene.add(cube.modelComponent.model);
            this.obstacles.push(cube);
        }
    }

    _initSystems(playthroughStats) {
        // Initialize UI Components and System.
        this.uiSystem = new UISystem({
            player: this.player,
            stats: playthroughStats,
            healthUI: new PlayerHealthUI(),
            levelUpUI: new LevelUpMenuUI(),
            endgameBanner: new EndGameBanner(),
            onLevelUp: this.startNextLevel,
            onRestart: this.end
        });

        // Initialize the InputControlsSystem and pair Controls with objects.
        this.inputControlsSystem = new InputControlsSystem({
            scene: this.scene,
            inputManager: this.inputManager,
            player: this.player,
            missiles: this.missiles,
            assetFactory: this.assetFactory
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
            obstacles: this.obstacles,
            onPlayerDeath: this.showEndgame,
            onLevelEnd: this.endCurrentLevel
        });

        // Initialize the Behavior System for missiles.
        this.behaviorSystem = new BehaviorSystem(this.missiles);
    }

    update(timeElapsed) {
        if (this.player.statsComponent.hp <= 0) {
            this.showEndgame();
        } else {
            this.camera.update();
            this.inputControlsSystem.update(timeElapsed);
            this.hitboxSystem.update();
            this.collisionSystem.update();
            this.behaviorSystem.update();
            // this.uiSystem.update();
        }
    }

    render = (timeElapsed) => {
        requestAnimationFrame(this.render);
        timeElapsed *= 0.001;
        this.update(timeElapsed);
        this._renderer.render(this.scene, this.camera._camera);
    }
}