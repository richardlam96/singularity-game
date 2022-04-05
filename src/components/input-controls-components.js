import { MoveForwardBehavior } from '../behaviors/move-forward-behavior';
import { ShootMissileBehavior } from '../behaviors/attack-behavior';
import { TurnLeftBehavior, TurnRightBehavior } from '../behaviors/turn-behavior';
import { Component } from './component';
import { Quaternion, Vector3 } from "three";

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

    turnTowards(direction) {
        let quaternion = this._parent.modelComponent.model.quaternion;
        let newQuat = new Quaternion().clone(quaternion).setFromUnitVectors(new Vector3(0, 0, 1), direction);
        quaternion.slerp(newQuat, this._parent.statsComponent.turnSpeed);
    }

    execute(game, timeElapsed) {
        MoveForwardBehavior.execute(this._parent);

        let enemyPosition = this._parent.modelComponent.model.position.clone();
        let playerPosition = game.player.modelComponent.model.position.clone();
        let vectorBetween = enemyPosition.add(playerPosition.clone().negate());
        let direction = vectorBetween.clone().normalize();
        let getPing = (timeElapsed - this._lastPingTime) > 3;
        let readyToFire = (timeElapsed - this._lastMissileTime) > this._parent.statsComponent.missileDelay;

        if ((vectorBetween.length() >= 20) && (vectorBetween.length() < 80)) {
            this.turnTowards(direction);
            if ((this._parent.modelComponent.model.getWorldDirection(new Vector3()).angleTo(direction) < 0.35)
                && readyToFire) {
                ShootMissileBehavior.execute(this._parent, game);
                this._lastMissileTime = timeElapsed;
            }
        } else if (vectorBetween.length() < 20) {
            this.turnTowards(direction.negate());
        } else if (getPing) {
            let quaternion = this._parent.modelComponent.model.quaternion;
            quaternion.setFromUnitVectors(new Vector3(0, 0, 1), direction);
            this._lastPingTime = timeElapsed;
        }
    }
}