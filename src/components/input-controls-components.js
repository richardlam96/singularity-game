import { MoveForwardBehavior } from '../behaviors/move-forward-behavior';
import { ShootMissileBehavior } from '../behaviors/attack-behavior';
import { TurnLeftBehavior, TurnRightBehavior } from '../behaviors/turn-behavior';
import { Component } from './component';

export class InputControlsComponent extends Component {
    execute() {}
}

export class PlayerInputControlsComponent extends InputControlsComponent {
    execute(assetFactory, inputManager, scene, missiles) {
        if (inputManager.keys.arrowUp) {
            MoveForwardBehavior.execute(this._parent);
        }
        
        if (inputManager.keys.arrowLeft) {
            TurnLeftBehavior.execute(this._parent);
        } else if (inputManager.keys.arrowRight) {
            TurnRightBehavior.execute(this._parent);
        }

        if (inputManager.keys.spacebar) {
            ShootMissileBehavior.execute(this._parent, scene, assetFactory, missiles);
        }
    }
}