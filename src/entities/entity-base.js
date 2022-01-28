export class EntityBase {
    constructor() {
        this.components = {};
    }

    addComponent(component) {
        this.components[component.constructor.name] = component;
    }
}