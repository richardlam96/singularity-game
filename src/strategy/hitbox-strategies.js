import * as THREE from 'three';
import { Strategy } from './strategy';

export class HalfDepthStrategy extends Strategy {
    execute(gameObject) {
        let modelBox = new THREE.Box3().setFromObject(gameObject.modelComponent.model);
        let modelBoxSize = new THREE.Vector3();
        modelBox.getSize(modelBoxSize);
        modelBoxSize.z /= 2;
        gameObject.hitboxComponent.hitbox.setFromCenterAndSize(gameObject.modelComponent.model.position, modelBoxSize);
    }
}

export class FullBoxStrategy extends Strategy {
    execute(gameObject) {
        gameObject.hitboxComponent.hitbox.setFromObject(gameObject.modelComponent.model);
    }
}