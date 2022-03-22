import { Controller } from "./controller";

export class PlaneController extends Controller {
    constructor(inputManager) {
        super(inputManager);
        this.speed = 0.1;
    }

    execute(gameObject) {
        if (this._inputManager.keys.arrowUp) {
            gameObject.model.position.z -= this.speed;
        } else if (this._inputManager.keys.arrowDown) {
            gameObject.model.position.z += this.speed;
        } 
        
        if (this._inputManager.keys.arrowLeft) {
            gameObject.model.position.x -= this.speed;
        } else if (this._inputManager.keys.arrowRight) {
            gameObject.model.position.x += this.speed;
        }
    }
}