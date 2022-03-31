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
        objectA.stats.hp -= objectB.stats.poise;
        objectB.stats.hp -= objectA.stats.poise;
    }

    update() {
        this.obstacles.forEach((obstacle, obstacleIndex) => {
            if (this.player.hitbox.intersectsBox(obstacle.hitbox)) {
                console.log("player and obstacle collided");
                this._handleObjectCollision(this.player, obstacle);
                console.log("Player health: ", this.player.stats.hp);
                console.log("Obstacle health: ", obstacle.stats.hp);
            }
            this.missiles.forEach((missile, missileIndex) => {
                if (missile.hitbox.intersectsBox(obstacle.hitbox)) {
                    console.log("missile and obstacle collided");
                    this._handleObjectCollision(missile, obstacle);
                    console.log("Missile health: ", missile.stats.hp);
                    console.log("Obstacle health: ", obstacle.stats.hp);
                }
                if (missile.stats.hp <= 0) {
                    missile.model.removeFromParent();
                    this.missiles.splice(missileIndex, 1);
                    console.log(this.missiles);
                }
            });
            if (obstacle.stats.hp <= 0) {
                obstacle.model.removeFromParent();
                this.obstacles.splice(obstacleIndex, 1);
            }
        });

        if (this.obstacles.length === 0) {
            this.onLevelEnd();
        }
    }
}