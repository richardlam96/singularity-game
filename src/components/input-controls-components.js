import { MoveForwardBehavior } from '../behaviors/move-forward-behavior';
import { ShootMissileBehavior } from '../behaviors/attack-behavior';
import { TurnLeftBehavior, TurnRightBehavior } from '../behaviors/turn-behavior';
import { Component } from './component';

export class ControlsComponent extends Component {
    execute() {}
}

export class PlayerInputControlsComponent extends ControlsComponent {
    execute(game) {
        if (game.inputManager.keys.arrowUp) {
            MoveForwardBehavior.execute(this._parent);
        }
        
        if (game.inputManager.keys.arrowLeft) {
            TurnLeftBehavior.execute(this._parent);
        } else if (game.inputManager.keys.arrowRight) {
            TurnRightBehavior.execute(this._parent);
        }

        if (game.inputManager.keys.spacebar) {
            ShootMissileBehavior.execute(this._parent, game);
        }
    }
}

export class MissileControlsComponent extends ControlsComponent {
    execute() {
        MoveForwardBehavior.execute(this._parent);
    }
}