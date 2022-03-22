import { Controller } from "./controller";

export class PlaneController extends Controller {
    constructor(inputManager) {
        super(inputManager);
    }

    execute(gameObject) {
        if (this._inputManager.keys.arrowLeft) {
            gameObject.model.position.x -= 1;
        } else if (this._inputManager.keys.arrowRight) {
            gameObject.model.position.x += 1;
        }
    }
}