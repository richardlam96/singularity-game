export class Entity {
    constructor() {
        this.components = {};
    }

    addComponent(component) {
        this.components[component.constructor.name] = component;
        component.setParent(this);
    }

    getComponent(componentName) {
        return this.components[componentName];
    }
}