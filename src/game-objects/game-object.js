import * as THREE from 'three';
import { Context } from '../strategy/strategy';

export class GameObject {
    constructor(model, hitboxStrategy) {
        this.model = model;
        this.hitbox = new THREE.Box3();
        this.hitboxContext = new Context();
        this.hitboxContext.setStrategy(hitboxStrategy);
    }
}