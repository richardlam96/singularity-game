import * as THREE from "three";
import { CollisionSystem } from "./systems/collision-system";
import { InputControlsSystem } from "./systems/input-controls-system";
import { HitboxSystem } from "./systems/hitbox-system";
import { LevelingSystem } from "./systems/leveling-system";
import { UISystem } from "./systems/ui-system";
import { BaseGameObject } from "./game-objects/game-object";
import { RPGStats, PlayerObjectStats } from "./game-objects/rpg-stats";
import { EndGameBanner } from "./ui/end-game-banner";
import { PlayerHealthUI } from './ui/player-health';
import { LevelUpMenuUI } from './ui/level-up-menu';
import { RandomGenerator } from "./utilities/random-generator";
import { LivingObject } from "./game-objects/living-object";
import { HitboxComponent, ModelComponent } from "./components/game-object-components";
import { PlayerInputControlsComponent } from "./components/input-controls-components";

const STARTING_STATS = {
    hp: 10,
    poise: 10,
    speed: 0.2,
    turnSpeed: 0.025,
    missileDelay: 0.1,
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
        
        this.levelUpMenu = new LevelUpMenuUI();
        this.endgameBanner = new EndGameBanner();

        this.currentLevelStats = {};
        this.currentPlayStats = {};
        this.player;
        this.obstacles = [];
        this.missiles = [];
        this.inputControlsSystem;
        this.collisionSystem;
        this.hitboxSystem;
        this.levelingSystem;
        this.uiSystem;
    }

    _initGameStats() {
        this.currentLevelStats = Object.assign({}, STARTING_STATS);
        this.currentPlayStats = Object.assign({}, STARTING_STATS);
    }

    startNewGame() {
        this._initGameStats();
        this.start(this.currentPlayStats);
    }

    startNextLevel = () => {
        this.clean();
        this.currentLevelStats.difficulty += 1;
        this.currentPlayStats = Object.assign({}, this.currentLevelStats);
        this.start(this.currentPlayStats);
    }

    endCurrentLevel = () => {
        this.uiSystem.showLevelMenu();
    }

    start(playStats) {
        this._initPlayer(playStats);
        this._initObstacles(playStats);
        this._initSystems(playStats);
    }

    clean() {
        this.player.modelComponent.model.removeFromParent();
        this.obstacles.forEach(obstacle => obstacle.modelComponent.model.removeFromParent());
        this.missiles.forEach(missile => missile.modelComponent.model.removeFromParent());
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

    _initPlayer(playStats) {
        this.player = new LivingObject({
            model: new ModelComponent(this.assetFactory.getPlane()),
            hitbox: new HitboxComponent(new THREE.Box3()),
            stats: new PlayerObjectStats(playStats),
            inputControls: new PlayerInputControlsComponent(),
            healthbar: new PlayerHealthUI()
        });
        this.scene.add(this.player.modelComponent.model);
        this.camera.setTarget(this.player.modelComponent.model);
    }

    _initObstacles(playStats) {
        for (let _ = 0; _ < 10; _++) {
            let cube = new BaseGameObject({
                model: new ModelComponent(this.assetFactory.getCube()),
                hitbox: new HitboxComponent(new THREE.Box3()),
                stats: new RPGStats({
                    hp: playStats.difficulty,
                    poise: playStats.difficulty
                })
            });
            let x = RandomGenerator.randIntBetween(-40, 40);
            let z = RandomGenerator.randIntBetween(-40, 40);
            cube.modelComponent.model.position.set(x, 0, z);
            this.scene.add(cube.modelComponent.model);
            this.obstacles.push(cube);
        }
    }

    _initSystems(playStats) {
        
        this.levelingSystem = new LevelingSystem(this);

        // Initialize UI Components and System.
        this.uiSystem = new UISystem(this);

        // Initialize the InputControlsSystem and pair Controls with objects.
        this.inputControlsSystem = new InputControlsSystem(this);

        // Initialize Hitbox System.
        this.hitboxSystem = new HitboxSystem({
            player: this.player,
            missiles: this.missiles,
            obstacles: this.obstacles
        });

        // Initialize the Collision System with the game objects.
        this.collisionSystem = new CollisionSystem(this);
    }

    update(timeElapsed) {
        if (this.player.statsComponent.hp <= 0) {
            this.showEndgame();
        } else {
            this.camera.update();
            this.inputControlsSystem.update(timeElapsed);
            this.hitboxSystem.update();
            this.collisionSystem.update();
            this.uiSystem.update();
        }
    }

    render = (timeElapsed) => {
        requestAnimationFrame(this.render);
        timeElapsed *= 0.001;
        this.update(timeElapsed);
        this._renderer.render(this.scene, this.camera._camera);
    }
}