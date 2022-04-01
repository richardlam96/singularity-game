import { MoveForwardBehavior } from '../behaviors/move-forward-behavior';
import { TurnLeftBehavior, TurnRightBehavior } from '../behaviors/turn-behavior';
import { Component } from './component';

export class InputComponent extends Component {
    execute() {}
}

export class PlayerInputComponent extends InputComponent {
    execute(inputManager, gameObject) {
        if (inputManager.keys.arrowUp) {
            MoveForwardBehavior.execute(gameObject);
        }
        
        if (inputManager.keys.arrowLeft) {
            TurnLeftBehavior(gameObject);
        } else if (this._inputManager.keys.arrowRight) {
            TurnRightBehavior(gameObject);
        }
    }
}