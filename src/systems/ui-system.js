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
        for (const [attr, value] of Object.entries(this.game.currentLevelStats)) {
            if (attr === 'difficulty') { continue; }

            let buttonText = attr + ' - ' + value;
            let callback;
            switch (attr) {
                case 'hp':
                    callback = this.game.levelingSystem.incrementHP;
                    break;
                case 'poise':
                    callback = this.game.levelingSystem.incrementPose;
                    break;
                case 'speed':
                    callback = this.game.levelingSystem.incrementSpeed;
                    break;
                case 'turnSpeed':
                    callback = this.game.levelingSystem.incrementTurnSpeed;
                    break;
                case 'missileDelay':
                    callback = this.game.levelingSystem.incrementMissileDelay;
                    break;
                case 'missileHealth':
                    callback = this.game.levelingSystem.incrementMissileHealth;
                    break;
                case 'missileDamage':
                    callback = this.game.levelingSystem.incrementMissileDamage;
                    break;
                case 'missileSpeed':
                    callback = this.game.levelingSystem.incrementMissileSpeed;
                    break;
            }
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