import { CollisionSystem } from "./systems/collision-system";
import { ControllerSystem } from "./systems/controller-system";
import { HitboxSystem } from "./systems/hitbox-system";
import { PlayerInputSystem } from "./systems/player-input-system";
import { ControlledGameObject } from "./game-objects/controlled-game-object";
import { GameObject } from "./game-objects/game-object";
import { RandomGenerator } from "./utilities/random-generator";
import { PlaneController } from "./controllers/plane-controller";
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
        this.gameObjects = [];
        // this.controllerSystem;
        this.collisionSystem;
        this.hitboxSystem;

        this._init();
    }

    _init() {
        // Initialize player plane and obstacles.
        this.plane = new GameObject({
            model: this.assetFactory.getPlane(), 
            hitboxStrategy: new HalfDepthStrategy(),
        });
        this.scene.add(this.plane.model);
        this.camera.setTarget(this.plane.model);

        for (let _ = 0; _ < 10; _++) {
            let cube = new GameObject({
                model: this.assetFactory.getCube(), 
                hitboxStrategy: new FullBoxStrategy()
            });
            let x = RandomGenerator.randIntBetween(-20, 20);
            let z = RandomGenerator.randIntBetween(-20, 20);
            cube.model.position.set(x, 0, z);
            this.scene.add(cube.model);
            this.gameObjects.push(cube);
        }

        // Initialize Controller System.
        // this.controllerSystem = new ControllerSystem([this.plane]);

        // Initialize the PlayerInputSystem.
        this.playerInputSystem = new PlayerInputSystem(this.inputManager, this.plane);

        // Initialize Hitbox System.
        this.hitboxSystem = new HitboxSystem({
            player: this.plane,
            obstacles: this.gameObjects
        });

        // Initialize the Collision System with the game objects.
        this.collisionSystem = new CollisionSystem({
            player: this.plane,
            obstacles: this.gameObjects
        });
    }

    update() {
        this.camera.update();
        // this.controllerSystem.update();
        this.playerInputSystem.update();
        this.hitboxSystem.update();
        this.collisionSystem.update();
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.update();
        this._renderer.render(this.scene, this.camera._camera);
    }
}