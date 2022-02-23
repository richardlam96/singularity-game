import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AssetFactory } from "./utilities/asset-factory";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
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

// Random int utility.
function getRandomInt() {
    let charge = Math.random() * -1;
    let value = Math.random() * 20;
    return charge * value;
}

// Add Assets to the scene.
let assetFactory = new AssetFactory();
assetFactory
.init()
.then(() => {
    let quadFighter = assetFactory.get("QUAD_FIGHTER");
    quadFighter.position.set(0, 0, 0);
    scene.add(quadFighter);

    for (let i = 0; i < 10; i++) {
        let cube = assetFactory.getCube();
        cube.position.set(getRandomInt(), 0, getRandomInt());
        scene.add(cube);
    }
});

function animate() {
	requestAnimationFrame(animate);
    controls.update();
	renderer.render(scene, camera);
}
animate();