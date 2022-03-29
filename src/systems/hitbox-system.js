import { System } from "./system";

export class HitboxSystem extends System {
    constructor(params) {
        super();
        this.player = params.player;
        this.missiles = params.missiles;
        this.obstacles = params.obstacles;
    }

    update() { 
        this.obstacles.forEach(obstacle => {
            obstacle.hitboxStrategy.execute(obstacle);
        });

        this.missiles.forEach(missile => {
            missile.hitboxStrategy.execute(missile);
        });

        this.player.hitboxStrategy.execute(this.player);
    }
}