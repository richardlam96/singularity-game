import { ModelComponent } from "../components/model-component";
import { PositionComponent } from "../components/position-component";

export class GameObject {
    constructor(filepath, x, y, z, rotation) {
        this.model = new ModelComponent(filepath);
        this.position = new PositionComponent(x, y, z, rotation);
    }
}