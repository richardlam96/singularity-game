import * as THREE from "three";
import { AssetFactory } from "./utilities/asset-factory";
import { InputManager } from "./utilities/input-manager";
import { Game } from "./game";


const assetFactory = new AssetFactory();
assetFactory.init()
.then(() => {

    // Initialize the scene.
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(50, 50));

    // Initialize the renderer.
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Initialize Camera Controls.
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // Add a light from the top.
    const light = new THREE.DirectionalLight(0xffffff);
    light.castShadow = true;
    scene.add(light);

    const inputManager = new InputManager();

    // Init and run the game.
    const game = new Game({
        renderer,
        scene,
        camera,
        light,
        assetFactory,
        inputManager
    });
    game.render();
});