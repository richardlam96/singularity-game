import { GameObject } from './game-object';

export class MovingObject extends GameObject {
    constructor(params) {
        super(params);
        this.behavior = params.behavior;
    }
}