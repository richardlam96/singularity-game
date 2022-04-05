import { Component } from '../components/component';

export class PlayerHealthUI extends Component {
    constructor() {
        super();
        this.locator = "span[id='player-health']";
        this.healthbarLocator = "div[id='player-health-bar']";
    }

    _getElement() {
        return document.querySelector(this.locator);
    }

    _getParent() {
        return document.querySelector(this.healthbarLocator);
    }

    flash() {
        this._getParent().style.background = "red";
        setTimeout(() => this._getParent().style.background = "transparent", 600);
    }

    clean() {
        this._getElement().innerHTML = '';
    }

    update() {
        this._getElement().innerHTML = this._parent.statsComponent.hp;
    }
}