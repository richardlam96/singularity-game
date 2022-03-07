import { Strategy } from "../strategy/strategy";

export class TurnLeftBehavior extends Strategy {
    execute(target) {
        target.position.x -= 1;
    }
}

export class TurnRightBehavior extends Strategy {
    execute(target) {
        target.position.x += 1;
    }
}