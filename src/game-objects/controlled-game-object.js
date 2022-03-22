import { GameObject } from "./game-object";

export class ControlledGameObject extends GameObject {
    constructor(model) {
        super(model);
        this.controller;
    }

    setController(controller) {
        this.controller = controller;
    }

    getController() {
        return this.controller;
    }

    update() {
        this.controller.execute(this);
    }
}