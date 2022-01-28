import { EntityBase } from "./entity-base";
import { ModelComponent } from "../components/model-component";
import { PositionComponent } from "../components/position-component";

export class GameObject extends EntityBase {
    constructor(model, x, y, z, rotation) {
        this.addComponent(new ModelComponent(model));
        this.addComponent(new PositionComponent(x, y, z, rotation));
    }
}