import { Vector3 } from "three";
import { Controller } from "./controller";

export class PlaneController extends Controller {
    constructor(inputManager) {
        super(inputManager);
        this.speed = 0.1;
    }

    execute(gameObject) {
        if (this._inputManager.keys.arrowUp) {
            gameObject.model.translateOnAxis(new Vector3(0, 0, -1), this.speed);
        } else if (this._inputManager.keys.arrowDown) {
            gameObject.model.translateOnAxis(new Vector3(0, 0, 1), this.speed);
        } 
        
        if (this._inputManager.keys.arrowLeft) {
            gameObject.model.rotation.y += this.speed / 2;
        } else if (this._inputManager.keys.arrowRight) {
            gameObject.model.rotation.y -= this.speed / 2;
        }
    }
}