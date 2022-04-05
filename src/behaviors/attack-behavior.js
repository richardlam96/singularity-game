import { ModelComponent, HitboxComponent } from "../components/game-object-components";
import { ControlledObject } from "../game-objects/controlled-object";
import { MissileStats } from "../game-objects/rpg-stats";
import { Behavior } from "./behavior";
import { Box3, Vector3 } from "three";
import { MissileControlsComponent } from "../components/input-controls-components";

export class ShootMissileBehavior extends Behavior {
    static execute(gameObject, game) {
        let newMissile = new ControlledObject({
            model: new ModelComponent(game.assetFactory.getMissile()),
            hitbox: new HitboxComponent(new Box3()),
            stats: new MissileStats({
                hp: gameObject.statsComponent.missileHealth,
                poise: gameObject.statsComponent.missileDamage,
                speed: gameObject.statsComponent.missileSpeed
            }),
            inputControls: new MissileControlsComponent()
        });

        let offset = new Vector3(0, 0, -4);
        offset.applyQuaternion(gameObject.modelComponent.model.quaternion);
        let newPosition = offset.add(gameObject.modelComponent.model.position);
        newMissile.modelComponent.model.position.copy(newPosition);
        newMissile.modelComponent.model.rotation.copy(gameObject.modelComponent.model.rotation);
        game.missiles.push(newMissile);
        game.scene.add(newMissile.modelComponent.model);
    }
}