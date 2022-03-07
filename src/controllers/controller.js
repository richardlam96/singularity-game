export class Controller {
    constructor(inputManager, gameObject) {
        this._inputManager = inputManager;
        this._gameObject = gameObject;
    }

    execute() {
        throw new Error("The execute() method needs to be implemented for the Controller interface.");
    }
}