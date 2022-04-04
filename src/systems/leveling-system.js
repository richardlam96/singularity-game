import { System } from "./system";

export class LevelingSystem extends System {
    constructor(game) {
        super(game);
    }

    incrementHP = () => this.incrementStat('hp', 1);
    incrementPoise = () => this.incrementStat('poise', 1);
    incrementSpeed = () => this.incrementStat('speed', 0.1);
    incrementTurnSpeed = () => this.incrementStat('turnSpeed', 0.025);
    incrementMissileDelay = () => this.decrementStat('missileDelay', 0.02);
    incrementMissileHealth = () => this.incrementStat('missileHealth', 1);
    incrementMissileDamage = () => this.incrementStat('missileDamage', 1);
    incrementMissileSpeed = () => this.incrementStat('missileSpeed', 1);

    incrementStat = (statName, amount) => { 
        let playerStats = this.game.currentLevelStats;
        let newValue = playerStats[statName] + amount;
        playerStats[statName] = Math.round(newValue * 1000) / 1000;
        this.game.startNextLevel(playerStats); 
    }
    
    decrementStat = (statName, amount) => { 
        let playerStats = this.game.currentLevelStats;
        let newValue = playerStats[statName] - amount;
        let roundedValue = Math.round(newValue * 1000) / 1000;
        playerStats[statName] = Math.max(0, roundedValue);
        this.game.startNextLevel(playerStats); 
    }

    update() {

    }
}