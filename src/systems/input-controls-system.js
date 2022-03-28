import { System } from './system';

export class InputControlsSystem extends System {
    constructor(params) {
        super()
        this._inputManager = params.inputManager;
        this._controls = params.controls;
    }

    update() {
        this._controls.forEach(controlSet => {
            controlSet.execute();
        });
    }
}