export class BaseGameObject {
    constructor(params) {
        this.modelComponent = params.model;
        this.hitboxComponent = params.hitbox;
        this.statsComponent = params.stats;
        this._init();
    }
    
    _init = () => {
        this.modelComponent.setParent(this);
        this.hitboxComponent.setParent(this);
        this.statsComponent.setParent(this);
    }
}