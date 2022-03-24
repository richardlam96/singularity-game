import * as THREE from 'three';

export class GameObject {
    constructor(model, hitboxStrategy) {
        this.model = model;
        this.hitbox = new THREE.Box3();
        this.hitboxStrategy = hitboxStrategy;
    }
}