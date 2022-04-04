import { System } from "./system";

export class CollisionSystem extends System {
    constructor(game) {
        super(game);
    }

    _handleObjectCollision(objectA, objectB) {
        objectA.statsComponent.hp -= objectB.statsComponent.poise;
        objectB.statsComponent.hp -= objectA.statsComponent.poise;
    }

    update() {
        this.game.enemies.forEach((enemy, enemyIndex) => {
            if (this.game.player.hitboxComponent.hitbox.intersectsBox(enemy.hitboxComponent.hitbox)) {
                this._handleObjectCollision(this.game.player, enemy);
            }
            this.game.missiles.forEach((missile, missileIndex) => {
                if (missile.hitboxComponent.hitbox.intersectsBox(enemy.hitboxComponent.hitbox)) {
                    this._handleObjectCollision(missile, enemy);
                }
                if (missile.statsComponent.hp <= 0) {
                    missile.modelComponent.model.removeFromParent();
                    this.game.missiles.splice(missileIndex, 1);
                }
            });
            if (enemy.statsComponent.hp <= 0) {
                enemy.modelComponent.model.removeFromParent();
                this.game.enemies.splice(enemyIndex, 1);
            }
        });

        if (this.game.enemies.length === 0) {
            this.game.endCurrentLevel();
        }
    }
}