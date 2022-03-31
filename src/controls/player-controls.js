import { Vector3 } from 'three';
import { Controls } from './controls';

export class PlayerControls extends Controls {
    constructor(inputManager) {
        super();
        this._inputManager = inputManager;
    }

    execute() {
        if (this._inputManager.keys.arrowUp) {
            this._parent.model.translateOnAxis(new Vector3(0, 0, -1), this._parent.stats.speed);
        }
        
        if (this._inputManager.keys.arrowLeft) {
            this._parent.model.rotation.y += this._parent.stats.turnSpeed;
        } else if (this._inputManager.keys.arrowRight) {
            this._parent.model.rotation.y -= this._parent.stats.turnSpeed;
        }
    }
}