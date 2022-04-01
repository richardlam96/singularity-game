import { System } from './system';

export class InputControlsSystem extends System {
    constructor(params) {
        super()
        this._scene = params.scene;
        this._inputManager = params.inputManager;
        this._assetFactory = params.assetFactory;
        this.player = params.player;
        this.missiles = params.missiles;
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

    update(timeElapsed) {
        this.player.inputControlsComponent.execute(this._assetFactory, this._inputManager, this._scene, this.missiles);
    }
}