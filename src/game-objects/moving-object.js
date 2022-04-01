import { BaseGameObject } from './game-object';

export class MovingObject extends BaseGameObject {
    constructor(params) {
        super(params);
        this.behaviorComponent = params.behavior;
        this._init();
    }

    _init = () => {
        this.behaviorComponent.setParent(this);
    }
}