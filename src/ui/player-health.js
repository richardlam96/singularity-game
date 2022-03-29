export class PlayerHealthUI {
    constructor() {
        this.locator = "span[id='player-health']";
    }

    update(number) {
        document.querySelector(this.locator).innerHTML = number;
    }
}