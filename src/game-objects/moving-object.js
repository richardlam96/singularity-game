import { BaseGameObject } from './game-object';

export class MovingObject extends BaseGameObject {
    constructor(params) {
        super(params);
        this.behavior = params.behavior;
    }
}