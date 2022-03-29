import { Vector3 } from 'three';
import { Controls } from './controls';

export class PlayerControls extends Controls {
    constructor(inputManager, playerObject) {
        super();
        this._inputManager = inputManager;
        this._playerObject = playerObject;
    }

    execute() {
        if (this._inputManager.keys.arrowUp) {
            this._playerObject.model.translateOnAxis(new Vector3(0, 0, -1), this._playerObject.stats.speed);
        } else if (this._inputManager.keys.arrowDown) {
            this._playerObject.model.translateOnAxis(new Vector3(0, 0, 1), this._playerObject.stats.speed);
        } 
        
        if (this._inputManager.keys.arrowLeft) {
            this._playerObject.model.rotation.y += this._playerObject.stats.turnSpeed;
        } else if (this._inputManager.keys.arrowRight) {
            this._playerObject.model.rotation.y -= this._playerObject.stats.turnSpeed;
        }
    }
}