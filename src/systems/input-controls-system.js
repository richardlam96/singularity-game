import { System } from './system';

export class InputControlsSystem extends System {
    constructor(game) {
        super()
        this._game = game;
    }

    createMissile() {
        let newMissile = new ControlledObject({
            model: new ModelComponent(this._game.assetFactory.getMissile()),
            hitbox: new HitboxComponent(new Box3()),
            stats: new MissileStats(this._game.currentPlaythroughStats)
        });
        this._game.missiles.push(newMissile);
        this._game.scene.add(newMissile.modelComponent.model);
        return newMissile;
    }

    update(timeElapsed) {
        this._game.player.inputControlsComponent.execute(this._game, timeElapsed);
        this._game.obstacles.forEach(obstacle => {
            obstacle.inputControlsComponent.execute(this._game, timeElapsed);
        });
        this._game.missiles.forEach(missile => {
            missile.inputControlsComponent.execute();
        });
    }
}