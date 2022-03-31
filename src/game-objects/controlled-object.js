import { BaseGameObject } from './game-object';

export class ControlledObject extends BaseGameObject {
    constructor(params) {
        super(params);
        this.inputControls = params.inputControls;
        this.healthbar = params.healthbar;
    }
}