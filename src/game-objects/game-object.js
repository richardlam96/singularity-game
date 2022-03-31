export class BaseGameObject {
    constructor(params) {
        this.model = params.model;
        this.hitbox = params.hitbox;
        this.stats = params.stats;
    }
}