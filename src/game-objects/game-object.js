import { Entity } from '../components/entity';

export class BaseGameObject extends Entity {
    constructor(params) {
        super();
        this.model = params.model;
        this.hitbox = params.hitbox;
        this.stats = params.stats;
    }
}