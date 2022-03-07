import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AssetFactory } from "./utilities/asset-factory";
import { GameObject } from "./game-objects/game-object";
import { RandomGenerator } from "./utilities/random-generator";


export class Game {
    constructor() {
        this._renderer;
        this._cameraControls;
        this.scene;
        this.camera;
        this.light;
        this.assetFactory;

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
        this._cameraControls = new OrbitControls(this.camera, this._renderer.domElement);
        this.camera.position.set(0, 10, 0);
        this._cameraControls.update();
        this.camera.lookAt(0, 0, 0);

        // Add a Grid for easier visibility and positioning.
        this.scene.add(new THREE.GridHelper(50, 50));

        // Add a light from the top.
        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.castShadow = true;
        this.scene.add(this.light);

        this.assetFactory = new AssetFactory();
        this.assetFactory
        .init()
        .then(() => {
            let plane = new GameObject(this.assetFactory.getPlane());
            plane.model.position.set(0, 0, 0);
            this.scene.add(plane.model);

            for (let _ = 0; _ < 10; _++) {
                let cube = new GameObject(this.assetFactory.getCube());
                let x = RandomGenerator.randIntBetween(-20, 20);
                let z = RandomGenerator.randIntBetween(-20, 20);
                cube.model.position.set(x, 0, z);
                this.scene.add(cube.model);
            }
        });
    }

    update() {
        this._cameraControls.update();  // For Orbit Camera
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.update();
        this._renderer.render(this.scene, this.camera);
    }
}