export class HitboxSystem {
    constructor(params) {
        this.player = params.player;
        this.obstacles = params.obstacles;
    }

    update() { 
        this.obstacles.forEach(obstacle => {
            obstacle.hitboxContext.executeStrategy();
        });

        this.player.hitboxContext.executeStrategy();
    }
}