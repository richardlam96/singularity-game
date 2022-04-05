import * as THREE from "three";
import { AssetFactory } from "./utilities/asset-factory";
import { InputManager } from "./utilities/input-manager";
import { ThirdPersonCamera } from "./utilities/third-person-camera";
import { Game } from "./game";
import skyboxRight from '../assets/Daylight Box_Right.bmp';
import skyboxLeft from '../assets/Daylight Box_Left.bmp';
import skyboxTop from '../assets/Daylight Box_Top.bmp';
import skyboxBottom from '../assets/Daylight Box_Bottom.bmp';
import skyboxFront from '../assets/Daylight Box_Front.bmp';
import skyboxBack from '../assets/Daylight Box_Back.bmp';


const assetFactory = new AssetFactory();
assetFactory.init()
.then(() => {

    // Initialize the scene.
    const scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader()
        .load([
            skyboxRight,
            skyboxLeft,
            skyboxTop,
            skyboxBottom,
            skyboxFront,
            skyboxBack,
        ]);

    // Initialize the renderer.
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Initialize Camera.
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const thirdPersonCamera = new ThirdPersonCamera({ camera })

    // Add a light from the top.
    const light = new THREE.DirectionalLight(0xffffff);
    light.castShadow = true;
    scene.add(light);

    const inputManager = new InputManager();

    // Init and run the game.
    const game = new Game({
        renderer,
        scene,
        camera: thirdPersonCamera,
        light,
        assetFactory,
        inputManager
    });
    game.startNewGame();
    game.render();
});