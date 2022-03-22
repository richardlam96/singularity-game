import * as THREE from "three";
import { ControlledGameObject } from "./game-objects/controlled-game-object";
import { GameObject } from "./game-objects/game-object";
import { InputManager } from "./utilities/input-manager";
import { RandomGenerator } from "./utilities/random-generator";
import { PlaneController } from "./controllers/plane-controller";


export class Game {
    constructor(assetFactory) {
        this._renderer;
        this.scene;
        this.camera;
        this.light;
        this.assetFactory = assetFactory;
        this.plane;
        this.gameObjects = [];
        this.inputManager = new InputManager;

        this._init();
    }

    _init() {
        // Initialize the scene.
        this.scene = new THREE.Scene();

        // Initialize the this._renderer.
        this._renderer = new THREE.WebGLRenderer({antialias: true});
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);

        // Initialize Camera Controls.
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
        // Add a Grid for easier visibility and positioning.
        this.scene.add(new THREE.GridHelper(50, 50));

        // Add a light from the top.
        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.castShadow = true;
        this.scene.add(this.light);

        // Initialize game objects and systems.
        this.plane = new ControlledGameObject(this.assetFactory.getPlane());
        this.plane.setController(new PlaneController(this.inputManager));
        this.plane.model.position.set(0, 0, 0);
        this.scene.add(this.plane.model);

        for (let _ = 0; _ < 10; _++) {
            let cube = new GameObject(this.assetFactory.getCube());
            let x = RandomGenerator.randIntBetween(-20, 20);
            let z = RandomGenerator.randIntBetween(-20, 20);
            cube.model.position.set(x, 0, z);
            this.scene.add(cube.model);
            this.gameObjects.push(cube);
        }
    }

    update() {
        // this._cameraControls.update();  // For Orbit Camera
        this.gameObjects.forEach(gameObject => gameObject.update());
        this.plane.update();

        // Calculate camera's position and lookAt.
        let planePosition = this.plane.model.position;
        let newPosition = new THREE.Vector3(0, 10, 10)
            .applyEuler(this.plane.model.rotation)
            .add(planePosition);
        let newLookAt = new THREE.Vector3(0, 0, -10)
            .applyEuler(this.plane.model.rotation)
            .add(planePosition);
        this.camera.position.copy(newPosition);
        this.camera.lookAt(newLookAt);

    }

    render = () => {
        requestAnimationFrame(this.render);
        this.update();
        this._renderer.render(this.scene, this.camera);
    }
}