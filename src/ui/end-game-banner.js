export class EndGameBanner {
    constructor() {
        this.locator = "div[id='end-game-banner']";
        this.restartButtonLocator = "button[id='restart-button']";
    }

    _getBanner() {
        return document.querySelector(this.locator);
    }

    _getRestartButton() {
        return document.querySelector(this.restartButtonLocator);
    }

    setRestart(callback) {
        this._getRestartButton().onclick = callback;
    }

    show() {
        this._getBanner().style.display = "flex";
    }

    hide() {
        this._getBanner().style.display = "none";
    }
}