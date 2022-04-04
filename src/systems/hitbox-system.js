import { System } from "./system";
import { HalfDepthStrategy, FullBoxStrategy } from "../strategy/hitbox-strategies";

export class HitboxSystem extends System {
    constructor(params) {
        super();
        this.player = params.player;
        this.missiles = params.missiles;
        this.obstacles = params.obstacles;
        this.hitboxStrategy = new HalfDepthStrategy();
    }

    update() { 
        this.obstacles.forEach(obstacle => {
            this.hitboxStrategy.execute(obstacle);
        });

        this.missiles.forEach(missile => {
            this.hitboxStrategy.execute(missile);
        });

        this.hitboxStrategy.execute(this.player);
    }
}