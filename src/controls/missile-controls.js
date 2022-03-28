import { Controls } from './controls';
import { GameObject } from '../game-objects/game-object';
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
    }

    execute() {
        if (this._inputManager.keys.spacebar) {
            let newMissile = new GameObject({
                model: this._assetFactory.getMissile(),
                hitboxStrategy: new FullBoxStrategy()
            });
            newMissile.model.position.copy(this._player.model.position);
            newMissile.model.rotation.copy(this._player.model.rotation);
            this._missiles.push(newMissile);
            this._scene.add(newMissile.model);
        }
    }
}