import { Vector3 } from 'three';
import { Controls } from './controls';

export class PlayerControls extends Controls {
    constructor(inputManager, playerObject) {
        super();
        this._inputManager = inputManager;
        this._playerObject = playerObject;
        this.speed = 0.1;
    }

    execute() {
        if (this._inputManager.keys.arrowUp) {
            this._playerObject.model.translateOnAxis(new Vector3(0, 0, -1), this.speed);
        } else if (this._inputManager.keys.arrowDown) {
            this._playerObject.model.translateOnAxis(new Vector3(0, 0, 1), this.speed);
        } 
        
        if (this._inputManager.keys.arrowLeft) {
            this._playerObject.model.rotation.y += this.speed / 2;
        } else if (this._inputManager.keys.arrowRight) {
            this._playerObject.model.rotation.y -= this.speed / 2;
        }
    }
}