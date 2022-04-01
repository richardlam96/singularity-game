import { Box3 } from 'three';
import { Controls } from './controls';
import { LivingObject } from '../game-objects/living-object';
import { MissileStats } from '../game-objects/rpg-stats';
import { FullBoxStrategy } from "../strategy/hitbox-strategies";
import { HitboxComponent, ModelComponent } from '../components/game-object-components';
import { ControlledObject } from '../game-objects/controlled-object';

export class MissileControls extends Controls {
    constructor(params) {
        super();
        this._scene = params.scene;
        this._inputManager = params.inputManager;
        this._assetFactory = params.assetFactory;
        this._missiles = params.missiles;
        this._missileStats = params.missileStats;
        this._player = params.player;
        this._lastMissileTime = 0;
    }

    createMissile() {
        let newMissile = new ControlledObject({
            model: new ModelComponent(this._assetFactory.getMissile()),
            hitbox: new HitboxComponent(new Box3()),
            stats: new MissileStats(this._missileStats)
        });
        this._missiles.push(newMissile);
        this._scene.add(newMissile.modelComponent.model);
        return newMissile;
    }

    execute(timeElapsed) {
        let readyToFire = (timeElapsed - this._lastMissileTime) > this._missileStats.delay;

        if (this._inputManager.keys.spacebar && readyToFire) {
            let newMissile = this.createMissile();
            newMissile.modelComponent.model.position.copy(this._player.modelComponent.model.position);
            newMissile.modelComponent.model.rotation.copy(this._player.modelComponent.model.rotation);
            this._lastMissileTime = timeElapsed;
        }
    }
}