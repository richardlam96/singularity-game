export class Controller {
    constructor(inputManager) {
        this._inputManager = inputManager;
    }

    execute() {
        throw new Error("The execute() method needs to be implemented for the Controller interface.");
    }
}