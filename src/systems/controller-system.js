import { System } from "./system";

export class ControllerSystem extends System {
    constructor(controlledObjects) {
        super();
        this.controlledObjects = controlledObjects;
    }

    update() {
        this.controlledObjects.forEach(object => {
            object.controller.execute(object);
        });
    }
}