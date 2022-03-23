import { GameObject } from "./game-object";

export class ControlledGameObject extends GameObject {
    constructor(model, hitboxStrategy) {
        super(model, hitboxStrategy);
        this.controller;
    }

    setController(controller) {
        this.controller = controller;
    }

    getController() {
        return this.controller;
    }
}