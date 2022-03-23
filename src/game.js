import { CollisionSystem } from "./systems/collision-system";
import { ControlledGameObject } from "./game-objects/controlled-game-object";
import { GameObject } from "./game-objects/game-object";
import { RandomGenerator } from "./utilities/random-generator";
import { PlaneController } from "./controllers/plane-controller";


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
        this.collisionSystem;

        this._init();
    }

    _init() {
        // Initialize player plane and obstacles.
        this.plane = new ControlledGameObject(this.assetFactory.getPlane());
        this.plane.setController(new PlaneController(this.inputManager));
        this.plane.model.position.set(0, this.plane.model.scale.y / 2, 0);
        this.scene.add(this.plane.model);
        this.camera.setTarget(this.plane.model);

        for (let _ = 0; _ < 10; _++) {
            let cube = new GameObject(this.assetFactory.getCube());
            let x = RandomGenerator.randIntBetween(-20, 20);
            let z = RandomGenerator.randIntBetween(-20, 20);
            cube.model.position.set(x, 0, z);
            this.scene.add(cube.model);
            this.gameObjects.push(cube);
        }

        // Initialize the Collision System with the game objects.
        this.collisionSystem = new CollisionSystem({
            player: this.plane,
            obstacles: this.gameObjects
        });
    }

    update() {
        this.gameObjects.forEach(gameObject => gameObject.update());
        this.plane.update();
        this.camera.update();
        this.collisionSystem.update();
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.update();
        this._renderer.render(this.scene, this.camera._camera);
    }
}