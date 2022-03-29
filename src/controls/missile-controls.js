import { MoveForwardBehavior } from '../behaviors/move-forward-behavior';
import { Controls } from './controls';
import { MovingObject } from '../game-objects/moving-object';
import { MissileStats } from '../game-objects/rpg-stats';
import { FullBoxStrategy } from "../strategy/hitbox-strategies";

export class MissileControls extends Controls {
    constructor(params) {
        super();
        this._scene = params.scene;
        this._inputManager = params.inputManager;
        this._assetFactory = params.assetFactory;
        this._missiles = params.missiles;
        this._player = params.player;
        this._lastMissileTime = 0;
    }

    execute(timeElapsed) {
        let readyToFire = (timeElapsed - this._lastMissileTime) > this._player.stats.missileDelay;

        if (this._inputManager.keys.spacebar && readyToFire) {
            let newMissile = new MovingObject({
                model: this._assetFactory.getMissile(),
                hitboxStrategy: new FullBoxStrategy(), // these can just have one ref.
                behavior: new MoveForwardBehavior(),
                stats: new MissileStats({
                    hp: this._player.stats.missileHealth,
                    poise: this._player.stats.missileDamage,
                    speed: this._player.stats.missileSpeed
                })
            });
            newMissile.model.position.copy(this._player.model.position);
            newMissile.model.rotation.copy(this._player.model.rotation);
            this._missiles.push(newMissile);
            this._scene.add(newMissile.model);
            this._lastMissileTime = timeElapsed;
        }
    }
}