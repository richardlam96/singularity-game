import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import starFighterGLTF from "../../assets/LPSP_SmallStarfighter.gltf";
import quadFighterGLTF from "../../assets/LPSP_QuadFighter.gltf";

export class AssetFactory {
    constructor() {
        this.gltfLoader = new GLTFLoader();
        this.assets = {};
    }

    async init() {
        this.assets["STAR_FIGHTER"] = await this.gltfLoader.loadAsync(starFighterGLTF);
        this.assets["QUAD_FIGHTER"] = await this.gltfLoader.loadAsync(quadFighterGLTF);
        this.assets["OBSTACLE"] = new THREE.Mesh(
            new THREE.BoxGeometry(2, 10, 2),
            new THREE.MeshToonMaterial({color: 0x00ff00})
        );
        this.assets["MISSILE"] = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 1),
            new THREE.MeshToonMaterial({color: 0xff0000})
        );
    }

    getCube() {
        return this.assets["OBSTACLE"].clone();
    }

    getPlane() {
        return this.assets["STAR_FIGHTER"].scene.clone();
    }

    getEnemyPlane() {
        return this.assets["QUAD_FIGHTER"].scene.clone();
    }

    getMissile() {
        return this.assets["MISSILE"].clone();
    }
}