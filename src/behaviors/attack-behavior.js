import { ModelComponent, HitboxComponent } from "../components/game-object-components";
import { ControlledObject } from "../game-objects/controlled-object";
import { MissileStats } from "../game-objects/rpg-stats";
import { Behavior } from "./behavior";
import { Box3 } from "three";

export class ShootMissileBehavior extends Behavior {
    static execute(gameObject, scene, assetFactory, missiles) {
        let newMissile = new ControlledObject({
            model: new ModelComponent(assetFactory.getMissile()),
            hitbox: new HitboxComponent(new Box3()),
            stats: new MissileStats(this._missileStats)
        });
        newMissile.modelComponent.model.position.copy(gameObject.modelComponent.model.position);
        newMissile.modelComponent.model.rotation.copy(gameObject.modelComponent.model.rotation);
        missiles.push(newMissile);
        scene.add(newMissile.modelComponent.model);
    }
}