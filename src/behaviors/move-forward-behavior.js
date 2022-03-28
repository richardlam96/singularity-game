import { Behavior } from './behavior';

export class MoveForwardBehavior extends Behavior {
    execute(gameObject, forwardSpeed) {
        gameObject.model.translateZ(forwardSpeed);
    }
}