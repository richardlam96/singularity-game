export class ControllerSystem {
    constructor(controlledObjects) {
        this.controlledObjects = controlledObjects;
    }

    update() {
        this.controlledObjects.forEach(object => {
            object.controller.execute(object);
        });
    }
}