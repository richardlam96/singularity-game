import { Component } from '../components/component';

export class PlayerHealthUI extends Component {
    constructor() {
        super();
        this.locator = "span[id='player-health']";
    }

    clean() {
        document.querySelector(this.locator).innerHTML = '';
    }

    update() {
        document.querySelector(this.locator).innerHTML = this._parent.statsComponent.hp;
    }
}