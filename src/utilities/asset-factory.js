import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import starfighterGLTF from "../../assets/LPSP_SmallStarfighter.gltf";

export class AssetFactory {
    constructor() {
        this.gltfLoader = new GLTFLoader();
        this.assets = {};
    }

    async init() {
        this.assets["STARFIGHTER"] = await this.gltfLoader.loadAsync(starfighterGLTF);
    }

    get(assetName) {
        return this.assets[assetName].scene.clone();
    }
}