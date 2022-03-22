export class GameObject {
    constructor(model) {
        this.model = model;
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