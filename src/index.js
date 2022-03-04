import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Game } from "./game";
import { AssetFactory } from "./utilities/asset-factory";
import { RandomGenerator } from "./utilities/random-generator";

// Initialize the scene.
let scene = new THREE.Scene();

// Initialize the renderer.
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize Camera Controls.
let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000 );
let controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 10, 0);
controls.update();
camera.lookAt(0, 0, 0);

// Add a Grid for easier visibility and positioning.
let grid = new THREE.GridHelper(50, 50);
scene.add(grid);

// Add a light from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.castShadow = true;
scene.add(directionalLight);

let assetFactory = new AssetFactory();
assetFactory
.init()
.then(() => {
    let plane = assetFactory.getPlane();
    plane.position.set(0, 0, 0);
    scene.add(plane);

    for (let i = 0; i < 10; i++) {
        let cube = assetFactory.getCube();
        let x = RandomGenerator.randIntBetween(0, 20);
        let z = RandomGenerator.randIntBetween(0, 20);
        cube.position.set(x, 0, z);
        scene.add(cube);
    }
});

// Init and run the game.
let game = new Game({
    scene: scene,
    camera: camera,
    light: directionalLight
});

function render() {
    requestAnimationFrame(render);
    controls.update();  // For Orbit Camera
    game.update();
    renderer.render(scene, camera);
}
render();