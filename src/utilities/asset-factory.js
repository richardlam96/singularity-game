import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import starFighterGLTF from "../../assets/LPSP_SmallStarfighter.gltf";
import luxuryShipGLTF from "../../assets/LPSP_LuxuryShip.gltf";
import quadFighterGLTF from "../../assets/LPSP_QuadFighter.gltf";

export class AssetFactory {
    constructor() {
        this.gltfLoader = new GLTFLoader();
        this.assets = {};
    }

    async init() {
        this.assets["STAR_FIGHTER"] = await this.gltfLoader.loadAsync(starFighterGLTF);
    }

    getCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshToonMaterial({color: 0x00ff00});
        return new THREE.Mesh( geometry, material );
    }

    getPlane() {
        return this.assets["STAR_FIGHTER"].scene.clone();
    }
}