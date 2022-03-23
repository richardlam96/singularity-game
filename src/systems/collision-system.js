import { Vector3 } from "three";

export class CollisionSystem {
    constructor(params) {
        this.player = params.player;
        this.obstacles = params.obstacles;
    }

    update() {
        this.obstacles.forEach(obstacle => {
            if (this.player.hitbox.intersectsBox(obstacle.hitbox)) {
                console.log("player and obstacle collided");
            }
        })
    }
}