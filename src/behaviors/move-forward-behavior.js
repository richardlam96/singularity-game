import { Behavior } from './behavior';

export class MoveForwardBehavior extends Behavior {
    static execute(gameObject) {
        let model = gameObject.modelComponent.model;
        let speed = gameObject.statsComponent.speed;
        model.translateZ(-1 * speed);
    }
}