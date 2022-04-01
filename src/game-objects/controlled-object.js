import { BaseGameObject } from './game-object';

export class ControlledObject extends BaseGameObject {
    constructor(params) {
        super(params);
        this.inputControlsComponent = params.inputControls;
        this.healthbarComponent = params.healthbar;
        this._init();
    }
    
    _init = () => {
        this.inputControlsComponent.setParent(this);
        this.healthbarComponent.setParent(this);
    }
}