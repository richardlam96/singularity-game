import { MissileControls } from "./controls/missile-controls";
import { PlayerControls } from "./controls/player-controls";
import { CollisionSystem } from "./systems/collision-system";
import { InputControlsSystem } from "./systems/input-controls-system";
import { HitboxSystem } from "./systems/hitbox-system";
import { MovementSystem } from "./systems/movement-system";
import { GameObject } from "./game-objects/game-object";
import { RPGStats, PlayerRPGStats, MissileStats } from "./game-objects/rpg-stats";
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

        this.plane;
        this.obstacles = [];
        this.missiles = [];
        this.inputControlsSystem;
        this.collisionSystem;
        this.hitboxSystem;
        this.movementSystem;

        this._init();
    }

    _init() {
        // Initialize player plane and obstacles.
        this.plane = new GameObject({
            model: this.assetFactory.getPlane(), 
            hitboxStrategy: new HalfDepthStrategy(),
            stats: new PlayerRPGStats({
                hp: 10,
                poise: 10,
                speed: 1,
                turnSpeed: 0.25,
                missileDelay: 1,
                missileDamange: 1,
                missileSpeed: 1
            })
        });
        this.scene.add(this.plane.model);
        this.camera.setTarget(this.plane.model);

        for (let _ = 0; _ < 10; _++) {
            let cube = new GameObject({
                model: this.assetFactory.getCube(), 
                hitboxStrategy: new FullBoxStrategy(),
                stats: new RPGStats({
                    hp: 3,
                    poise: 3
                })
            });
            let x = RandomGenerator.randIntBetween(-40, 40);
            let z = RandomGenerator.randIntBetween(-40, 40);
            cube.model.position.set(x, 0, z);
            this.scene.add(cube.model);
            this.obstacles.push(cube);
        }

        // Initialize the InputControlsSystem and pair Controls with objects.
        this.inputControlsSystem = new InputControlsSystem({
            inputManager: this.inputManager,
            controls: [
                new PlayerControls(this.inputManager, this.plane),
                new MissileControls({
                    scene: this.scene,
                    inputManager: this.inputManager,
                    assetFactory: this.assetFactory,
                    missiles: this.missiles,
                    missileStats: new MissileStats({
                        hp: 1,
                        poise: 3,
                        speed: 1
                    }),
                    player: this.plane
                })
            ]
        });

        // Initialize Hitbox System.
        this.hitboxSystem = new HitboxSystem({
            player: this.plane,
            missiles: this.missiles,
            obstacles: this.obstacles
        });

        // Initialize the Collision System with the game objects.
        this.collisionSystem = new CollisionSystem({
            player: this.plane,
            missiles: this.missiles,
            obstacles: this.obstacles
        });

        // Initialize the Movement System for missiles.
        this.movementSystem = new MovementSystem(this.missiles);
    }

    update(timeElapsed) {
        this.camera.update();
        this.inputControlsSystem.update(timeElapsed);
        this.hitboxSystem.update();
        this.collisionSystem.update();
        this.movementSystem.update();
    }

    render = (timeElapsed) => {
        requestAnimationFrame(this.render);
        timeElapsed *= 0.001;
        this.update(timeElapsed);
        this._renderer.render(this.scene, this.camera._camera);
    }
}