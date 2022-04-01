import { Component } from './component';

export class ModelComponent extends Component {
    constructor(model) {
        super();
        this.model = model;
    }
}

export class HitboxComponent extends Component {
    constructor(hitbox) {
        super();
        this.hitbox = hitbox;
    }
}
