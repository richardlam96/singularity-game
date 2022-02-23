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
        this.assets["LUXURY_SHIP"] = await this.gltfLoader.loadAsync(luxuryShipGLTF);
        this.assets["QUAD_FIGHTER"] = await this.gltfLoader.loadAsync(quadFighterGLTF);
    }

    get(assetName) {
        return this.assets[assetName].scene.clone();
    }
}