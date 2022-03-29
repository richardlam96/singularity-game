import { System } from './system';

export class UISystem extends System {
    constructor(params) {
        super();
        this.player = params.player;
        this.healthUI = params.healthUI;
    }

    update() {
        this.healthUI.update(this.player.stats.hp);
    }
}