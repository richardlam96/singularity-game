import { Component } from '../components/component';

export class RPGStats extends Component { 
    constructor(params) {
        super();
        this.hp = params.hp;
        this.poise = params.poise;
    }
}

export class MissileStats extends RPGStats {
    constructor(params) {
        super(params);
        this.speed = params.speed;
        // this.missileDamage = params.missileDamage;
        // this.missileSpeed = params.missileSpeed;
        // this.missileHealth = params.missileHealth;
 }
}

export class PlayerObjectStats extends RPGStats {
    constructor(params) {
        super(params);
        this.speed = params.speed;
        this.turnSpeed = params.turnSpeed;
    }
}

// Optionally, make a PlaythroughStats to store all.