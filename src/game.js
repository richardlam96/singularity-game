import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AssetFactory } from "./utilities/asset-factory";
import { RandomGenerator } from "./utilities/random-generator";

export class Game {
    constructor() {
        this._assetFactory = new AssetFactory();
        this._renderer = new THREE.WebGLRenderer({antialias: true});
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._init();
    }

    _init() {
        // Init Renderer.
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);

        // Init Camera Controls.
        this._camera.position.set(0, 10, 0);
        this._controls.update();
        this._camera.lookAt(0, 0, 0);

        // Add a Grid for easier visibility and positioning.
        let grid = new THREE.GridHelper(50, 50);
        this._scene.add(grid);

        // Add a light from the top.
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.castShadow = true;
        this._scene.add(directionalLight);
    }

    loadObjects() {
        this._assetFactory
        .init()
        .then(() => {
            let plane = this._assetFactory.getPlane();
            plane.position.set(0, 0, 0);
            this._scene.add(plane);

            for (let i = 0; i < 10; i++) {
                let cube = this._assetFactory.getCube();
                let x = RandomGenerator.randIntBetween(0, 20);
                let z = RandomGenerator.randIntBetween(0, 20);
                cube.position.set(x, 0, z);
                this._scene.add(cube);
            }
        });
    }

    update() {
        this._controls.update();
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.update();
        this._renderer.render(this._scene, this._camera);
    }
}