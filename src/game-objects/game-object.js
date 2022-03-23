import * as THREE from 'three';

export class GameObject {
    constructor(model) {
        this.model = model;
        this.hitbox = new THREE.Box3().setFromObject(model);
    }

    _updateHitbox() {
        this.hitbox.setFromObject(this.model);
    }

    update() {
        this._updateHitbox();
    }
}