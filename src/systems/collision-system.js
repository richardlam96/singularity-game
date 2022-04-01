import { System } from "./system";

export class CollisionSystem extends System {
    constructor(params) {
        super();
        this.player = params.player;
        this.missiles = params.missiles;
        this.obstacles = params.obstacles;
        this.onPlayerDeath = params.onPlayerDeath;
        this.onLevelEnd = params.onLevelEnd;
    }

    _handleObjectCollision(objectA, objectB) {
        objectA.statsComponent.hp -= objectB.statsComponent.poise;
        objectB.statsComponent.hp -= objectA.statsComponent.poise;
    }

    update() {
        this.obstacles.forEach((obstacle, obstacleIndex) => {
            if (this.player.hitboxComponent.hitbox.intersectsBox(obstacle.hitboxComponent.hitbox)) {
                this._handleObjectCollision(this.player, obstacle);
            }
            this.missiles.forEach((missile, missileIndex) => {
                if (missile.hitboxComponent.hitbox.intersectsBox(obstacle.hitboxComponent.hitbox)) {
                    this._handleObjectCollision(missile, obstacle);
                }
                if (missile.statsComponent.hp <= 0) {
                    missile.modelComponent.model.removeFromParent();
                    this.missiles.splice(missileIndex, 1);
                }
            });
            if (obstacle.statsComponent.hp <= 0) {
                obstacle.modelComponent.model.removeFromParent();
                this.obstacles.splice(obstacleIndex, 1);
            }
        });

        if (this.obstacles.length === 0) {
            this.onLevelEnd();
        }
    }
}