import { System } from './system';

export class InputControlsSystem extends System {
    constructor(params) {
        super()
        this.player = params.player;
        this._inputManager = params.inputManager;
        this._controls = params.controls;
    }

    update(timeElapsed) {
        this.player.inputControls.execute();
        this._controls.forEach(controlSet => {
            controlSet.execute(timeElapsed);
        });
    }
}