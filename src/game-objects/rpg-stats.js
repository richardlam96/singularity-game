export class RPGStats { 
    constructor(params) {
        this.hp = params.hp;
        this.poise = params.poise;
    }
}

export class MissileStats extends RPGStats {
    constructor(params) {
        super(params);
        this.speed = params.speed;
    }
}

export class PlayerRPGStats extends RPGStats {
    constructor(params) {
        super(params);
        this.speed = params.speed;
        this.turnSpeed = params.turnSpeed;
        this.missileDelay = params.missileDelay;
        this.missileDamage = params.missileDamage;
        this.missileSpeed = params.missileSpeed;
    }
}