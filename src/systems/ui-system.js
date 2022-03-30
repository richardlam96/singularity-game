import { System } from './system';

export class UISystem extends System {
    constructor(params) {
        super();
        this.stats = params.stats;
        this.healthUI = params.healthUI;
        this.levelUpUI = params.levelUpUI;
        this.endgameBanner = params.endgameBanner;
        this.onLevelUp = params.onLevelUp;
        this.onRestart = params.onRestart;
        this._init();
    }

    _init() {
        this.addLevelOptions();
        this.setRestartCallback();
    }

    showEndBanner() {
        this.endgameBanner.show();
    }

    addLevelOptions() {
        let incrementStat = (statName, amount) => { 
            let newValue = this.stats[statName] + amount;
            this.stats[statName] = Math.round(newValue * 1000) / 1000;
            this.onLevelUp(this.stats); 
        };
        let decrementStat = (statName, amount) => { 
            let newValue = this.stats[statName] - amount;
            let roundedValue = Math.round(newValue * 1000) / 1000;
            this.stats[statName] = Math.max(0, roundedValue);
            this.onLevelUp(this.stats); 
        };

        let levelIncrementCallbacks = {
            'hp': () => incrementStat('hp', 1),
            'poise': () => incrementStat('poise', 1),
            'speed': () => incrementStat('speed', 0.1),
            'turnSpeed': () => incrementStat('turnSpeed', 0.025),
            'missileDelay': () => decrementStat('missileDelay', 0.02),
            'missileHealth': () => incrementStat('missileHealth', 1),
            'missileDamage': () => incrementStat('missileDamage', 1),
            'missileSpeed': () => incrementStat('missileSpeed', 1)
        };

        // Basic callbacks for incrementing or decrementing a stat.

        for (const [attr, value] of Object.entries(this.stats)) {
            let buttonText = attr + ' - ' + value;
            let callback = levelIncrementCallbacks[attr];
            this.levelUpUI.addMenuOption(buttonText, callback);
        }
    }

    setRestartCallback() {
        this.endgameBanner.setRestart(this.onRestart);
    }

    clean() {
        this.healthUI.clean();
        this.levelUpUI.clean();
        this.endgameBanner.hide();
    }

    update() {
        // Do we need to have this updated per frame, or can we do this on event?
        this.healthUI.update(this.stats.hp);
    }
}