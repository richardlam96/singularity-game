import * as THREE from 'three';

export class GameObject {
    constructor(model) {
        this.model = model;
        this.hitbox = new THREE.Box3();
    }

    _updateHitbox() {
        let modelBox = new THREE.Box3().setFromObject(this.model);
        let modelBoxSize = new THREE.Vector3()
        modelBox.getSize(modelBoxSize);
        this.hitbox.setFromCenterAndSize(this.model.position, modelBoxSize.divideScalar(2));
    }

    update() {
        this._updateHitbox();
    }
}