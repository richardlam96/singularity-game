import { BaseGameObject } from './game-object';

export class ControlledObject extends BaseGameObject {
    constructor(params) {
        super(params);
        this.inputControlsComponent = params.inputControls;
        // this.healthbar = params.healthbar;
        this._init();
    }
    
    _init = () => {
        this.inputControlsComponent.setParent(this);
    }
}