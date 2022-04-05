import { MoveForwardBehavior } from '../behaviors/move-forward-behavior';
import { ShootMissileBehavior } from '../behaviors/attack-behavior';
import { TurnLeftBehavior, TurnRightBehavior } from '../behaviors/turn-behavior';
import { Component } from './component';
import { Vector3 } from "three";

export class ControlsComponent extends Component {
    execute() {}
}

export class MissileControlsComponent extends ControlsComponent {
    execute() {
        MoveForwardBehavior.execute(this._parent);
    }
}

export class PlayerInputControlsComponent extends ControlsComponent {
    constructor() {
        super();
        this._lastMissileTime = 0;
    }
    execute(game, timeElapsed) {
        MoveForwardBehavior.execute(this._parent);
        
        if (game.inputManager.keys.arrowLeft) {
            TurnLeftBehavior.execute(this._parent);
        } else if (game.inputManager.keys.arrowRight) {
            TurnRightBehavior.execute(this._parent);
        }

        let readyToFire = (timeElapsed - this._lastMissileTime) > this._parent.statsComponent.missileDelay;
        if (game.inputManager.keys.spacebar && readyToFire) {
            ShootMissileBehavior.execute(this._parent, game);
            this._lastMissileTime = timeElapsed;
        }
    }
}

export class EnemyInputControlsComponent extends ControlsComponent {
    constructor() {
        super();
        this._lastMissileTime = 0;
        this._lastPingTime = 0;
        this.willFire = (Math.random() < 0.5);
    }

    execute(game, timeElapsed) {
        MoveForwardBehavior.execute(this._parent);

        let getPing = (timeElapsed - this._lastPingTime) > 5;
        if (getPing && (Math.random() < 0.5)) {
            let enemyPosition = this._parent.modelComponent.model.position.clone();
            let playerPosition = game.player.modelComponent.model.position.clone();
            let newLookAt = enemyPosition.add(playerPosition.clone().negate());
            this._parent.modelComponent.model.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), newLookAt.clone().normalize());
            this._lastPingTime = timeElapsed;
        }

        let readyToFire = (timeElapsed - this._lastMissileTime) > this._parent.statsComponent.missileDelay;
        if (readyToFire && this.willFire) {
            ShootMissileBehavior.execute(this._parent, game);
            this._lastMissileTime = timeElapsed;
        }
    }
}