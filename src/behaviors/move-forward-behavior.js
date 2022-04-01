import { Behavior } from './behavior';

export class MoveForwardBehavior extends Behavior {
    execute() {
        this._parent.modelComponent.model.translateZ(-1 * this._parent.statsComponent.speed);
    }
}