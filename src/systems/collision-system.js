import { System } from "./system";

export class CollisionSystem extends System {
    constructor(params) {
        super();
        this.player = params.player;
        this.obstacles = params.obstacles;
    }

    update() {
        this.obstacles.forEach(obstacle => {
            if (this.player.hitbox.intersectsBox(obstacle.hitbox)) {
                console.log("player and obstacle collided");
            }
        });
    }
}