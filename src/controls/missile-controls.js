import { MoveForwardBehavior } from '../behaviors/move-forward-behavior';
import { Controls } from './controls';
import { MovingObject } from '../game-objects/moving-object';
import { FullBoxStrategy } from "../strategy/hitbox-strategies";

export class MissileControls extends Controls {
    constructor(params) {
        super();

        // Add most of this logic to game, and use method reference here?
        this._scene = params.scene;
        this._inputManager = params.inputManager;
        this._assetFactory = params.assetFactory;
        this._missiles = params.missiles;
        this._player = params.player;

        this._lastMissileTime = 0;
    }

    execute(timeElapsed) {

        let readyToFire = (timeElapsed - this._lastMissileTime) > 1;  // this should come from player rpg.

        if (this._inputManager.keys.spacebar && readyToFire) {
            let newMissile = new MovingObject({
                model: this._assetFactory.getMissile(),
                hitboxStrategy: new FullBoxStrategy(),
                behavior: new MoveForwardBehavior()  // this should be a reference to one thing?
            });
            newMissile.model.position.copy(this._player.model.position);
            newMissile.model.rotation.copy(this._player.model.rotation);
            this._missiles.push(newMissile);
            this._scene.add(newMissile.model);
            this._lastMissileTime = timeElapsed;
        }
    }
}