import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AssetFactory } from "./utilities/asset-factory";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(0, 10, -10);
controls.update();
camera.lookAt(0, 0, 0);

// Add a Grid for easier visibility and positioning.
let grid = new THREE.GridHelper(50, 50);
scene.add(grid);

// Add a light from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(directionalLight);

// Test Cube.
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh( geometry, material );
cube.position.set(10, 0, 10);
scene.add(cube);

// Add Assets to the scene.
let assetFactory = new AssetFactory();
assetFactory
.init()
.then(() => {
    for (let i = 0; i < 3; i++) {
        let planeMesh = assetFactory.get("STARFIGHTER")
        planeMesh.position.set(i * 5, i * 2, 0)
        scene.add(planeMesh);
    }
});

function animate() {
	requestAnimationFrame(animate);
    controls.update();
	renderer.render(scene, camera);
}
animate();