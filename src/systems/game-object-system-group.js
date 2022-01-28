import * as THREE from "three";
import { ModelComponent } from "../components/model-component";
import { PositionComponent } from "../components/position-component";
import { EntityManager } from "../entities/entity-manager";
import { GameObject } from "../entities/game-object";

export class GameObjectSystemGroup {
    constructor(scene) {
        this.scene = scene;

        // Initialize loader to load models from file.
        this.loader = new THREE.GLTFLoader();
        
        // Use an EM to add models and model clones.
        this.entityManager = new EntityManager();
    }

    onLoad(gltf) {
        let gameObject = new GameObject(gltf.scene, 0, 0, 0, 0);
        this.entityManager.addEntity(gameObject);
        this.scene.add(gameObject.components[ModelComponent.name].model);
    }
    
    loadGameObjects() {
        // Load the car.
        this.loader.load("models/car_model.gltf", onLoad);

        // Load the road segments.
        // Load the trees.
    }

   placeObjects() {
        // Place Objects in the 3D space based on model and position.
        let relatedEntities = this._getRelatedEntities();
        relatedEntities.forEach(gameObject => {
            let modelData = gameObject.components[ModelComponent.name].filepath;
            let position = gameObject.components[PositionComponent.name].position;
            model.position = new THREE.Vector3(position.x, position.y, position.z);
            model.rotation
        });
    }

    onUpdate() {}
}