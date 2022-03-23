import * as THREE from 'three';
import { Strategy } from './strategy';

export class HalfBoxStrategy extends Strategy {
    execute(gameObject) {
        let modelBox = new THREE.Box3().setFromObject(gameObject.model);
        let modelBoxSize = new THREE.Vector3();
        modelBox.getSize(modelBoxSize);
        gameObject.hitbox.setFromCenterAndSize(gameObject.model.position, modelBoxSize.divideScalar(2));
    }
}

export class FullBoxStrategy extends Strategy {
    execute(gameObject) {
        gameObject.hitbox.setFromObject(gameObject.model);
    }
}