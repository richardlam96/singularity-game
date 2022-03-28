import { System } from './system';

export class PlayerInputSystem extends System {
    constructor(inputManager, playerObject) {
        super();
        this._inputManager = inputManager;
        this._playerObject = playerObject;
    }

    update() {
        if (this._inputManager.keys.arrowUp) {
            playerObject.model.translateOnAxis(new Vector3(0, 0, -1), this.speed);
        } else if (this._inputManager.keys.arrowDown) {
            playerObject.model.translateOnAxis(new Vector3(0, 0, 1), this.speed);
        } 
        
        if (this._inputManager.keys.arrowLeft) {
            playerObject.model.rotation.y += this.speed / 2;
        } else if (this._inputManager.keys.arrowRight) {
            playerObject.model.rotation.y -= this.speed / 2;
        }
    }
}