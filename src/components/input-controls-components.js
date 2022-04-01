import { MoveForwardBehavior } from '../behaviors/move-forward-behavior';
import { TurnLeftBehavior, TurnRightBehavior } from '../behaviors/turn-behavior';
import { Component } from './component';

export class InputControlsComponent extends Component {
    execute() {}
}

export class PlayerInputControlsComponent extends InputControlsComponent {
    execute(inputManager) {
        if (inputManager.keys.arrowUp) {
            MoveForwardBehavior.execute(this._parent);
        }
        
        if (inputManager.keys.arrowLeft) {
            TurnLeftBehavior.execute(this._parent);
        } else if (inputManager.keys.arrowRight) {
            TurnRightBehavior.execute(this._parent);
        }
    }
}