import { System } from './system';

export class UISystem extends System {
    constructor(game) {
        super(game);
        this._init();
    }

    _init() {
        this.addLevelOptions();
        this.setRestartCallback();
    }

    showEndBanner() {
        this.game.endgameBanner.show();
    }

    showLevelMenu() {
        this.game.levelUpMenu.show();
    }

    addLevelOptions() {

        // This stuff should be somewhere else.
        let playerStats = this.game.player.statsComponent;

        let incrementStat = (statName, amount) => { 
            let newValue = playerStats[statName] + amount;
            playerStats[statName] = Math.round(newValue * 1000) / 1000;
            this.game.startNextLevel(playerStats); 
        };
        let decrementStat = (statName, amount) => { 
            let newValue = playerStats[statName] - amount;
            let roundedValue = Math.round(newValue * 1000) / 1000;
            playerStats[statName] = Math.max(0, roundedValue);
            this.game.startNextLevel(playerStats); 
        };

        // Basic callbacks for incrementing or decrementing a stat.
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

        // Only this is for UI.
        for (const [attr, value] of Object.entries(playerStats)) {
            let buttonText = attr + ' - ' + value;
            let callback = levelIncrementCallbacks[attr];
            this.game.levelUpMenu.addMenuOption(buttonText, callback);
        }
    }

    setRestartCallback() {
        this.game.endgameBanner.setRestart(this.game.end);
    }

    clean() {
        this.game.levelUpMenu.clean();
        this.game.endgameBanner.hide();
    }

    update() {
        // Do we need to have this updated per frame, or can we do this on event?
        this.game.player.healthbarComponent.update();
    }
}