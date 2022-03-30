export class LevelUpMenuUI {
    constructor() {
        this.locator = "div[id='level-up-menu']";
        this.optionsListLocator = "div[id='level-up-menu-options']";
    }

    _getList() {
        return document.querySelector(this.optionsListLocator);
    }

    addMenuOption(name, callback) {
        let newMenuOption = document.createElement('button');
        newMenuOption.textContent = name;
        newMenuOption.onclick = () => { callback(); };
        this._getList().appendChild(newMenuOption);
    }

    clean() {
        document.querySelector(this.optionsListLocator).innerHTML = '';
    }
}