export class PlayerHealthUI {
    constructor() {
        this.locator = "span[id='player-health']";
    }

    clean() {
        document.querySelector(this.locator).innerHTML = '';
    }

    update(number) {
        document.querySelector(this.locator).innerHTML = number;
    }
}