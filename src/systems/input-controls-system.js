import { System } from './system';

export class InputControlsSystem extends System {
    constructor(params) {
        super()
        this._inputManager = params.inputManager;
        this._controlsToObjectMap = params.controlsToObjectMap;
    }

    update() {
        for (const [controlCommand, gameObjects] in Object.entries(this._controlsToObjectMap)) {
            gameObjects.forEach(gameObject => {
                controlCommand.execute(gameObject);
            });
        }
    }
}