import { Behavior } from './behavior';

export class TurnLeftBehavior extends Behavior {
    static execute(gameObject) {
        let model = gameObject.modelComponent.model;
        let turnSpeed = gameObject.statsComponent.turnSpeed;
        model.rotation.y += turnSpeed;
    }
}

export class TurnRightBehavior extends Behavior {
    static execute(gameObject) {
        let model = gameObject.modelComponent.model;
        let turnSpeed = gameObject.statsComponent.turnSpeed;
        model.rotation.y -= turnSpeed;
    }
}
