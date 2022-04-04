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
        this.game.obstacles.forEach((obstacle, obstacleIndex) => {
            if (this.game.player.hitboxComponent.hitbox.intersectsBox(obstacle.hitboxComponent.hitbox)) {
                this._handleObjectCollision(this.game.player, obstacle);
            }
            this.game.missiles.forEach((missile, missileIndex) => {
                if (missile.hitboxComponent.hitbox.intersectsBox(obstacle.hitboxComponent.hitbox)) {
                    this._handleObjectCollision(missile, obstacle);
                }
                if (missile.statsComponent.hp <= 0) {
                    missile.modelComponent.model.removeFromParent();
                    this.game.missiles.splice(missileIndex, 1);
                }
            });
            if (obstacle.statsComponent.hp <= 0) {
                obstacle.modelComponent.model.removeFromParent();
                this.game.obstacles.splice(obstacleIndex, 1);
            }
        });

        if (this.game.obstacles.length === 0) {
            this.game.endCurrentLevel();
        }
    }
}