import * as THREE from 'three';
import { Strategy } from './strategy';

export class HalfDepthStrategy extends Strategy {
    execute(gameObject) {
        let modelBox = new THREE.Box3().setFromObject(gameObject.model);
        let modelBoxSize = new THREE.Vector3();
        modelBox.getSize(modelBoxSize);
        let division = new THREE.Vector3(1, 1, 2);
        gameObject.hitbox.setFromCenterAndSize(gameObject.model.position, modelBoxSize.divide(division));
    }
}

export class FullBoxStrategy extends Strategy {
    execute(gameObject) {
        gameObject.hitbox.setFromObject(gameObject.model);
    }
}