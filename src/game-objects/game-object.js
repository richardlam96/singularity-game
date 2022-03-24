import * as THREE from 'three';

export class GameObject {
    constructor(params) {
        this.model = params.model;
        this.hitbox = new THREE.Box3();
        this.hitboxStrategy = params.hitboxStrategy;
    }
}