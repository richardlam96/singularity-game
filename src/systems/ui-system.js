import { System } from './system';

export class UISystem extends System {
    constructor(params) {
        super();
        this.stats = params.stats;
        this.healthUI = params.healthUI;
        this.levelUpUI = params.levelUpUI;
        this._init();
    }

    _init() {
        this.addLevelOptions();
    }

    addLevelOptions() {
        // Basic callbacks for incrementing or decrementing a stat.
        let incrementStat = (statName) => { this.stats[statName] += 1; }
        let decrementStat = (statName) => { this.stats[statName] -= 0.1; }

        for (const [attr, value] of Object.entries(this.stats)) {
            let buttonText = attr + ' - ' + value;
            if (attr === 'missileDelay') {
                this.levelUpUI.addMenuOption(buttonText, decrementStat, attr);
            } else {
                this.levelUpUI.addMenuOption(buttonText, incrementStat, attr);
            }
        }
    }

    update() {
        // Do we need to have this updated per frame, or can we do this on event?
        this.healthUI.update(this.stats.hp);
    }
}