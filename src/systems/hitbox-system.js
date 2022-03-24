export class HitboxSystem {
    constructor(params) {
        this.player = params.player;
        this.obstacles = params.obstacles;
    }

    update() { 
        this.obstacles.forEach(obstacle => {
            obstacle.hitboxStrategy.execute(obstacle);
        });

        this.player.hitboxStrategy.execute(this.player);
    }
}