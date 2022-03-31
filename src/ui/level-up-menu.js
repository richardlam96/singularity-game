export class LevelUpMenuUI {
    constructor() {
        this.locator = "div[id='level-up-menu']";
        this.optionsListLocator = "div[id='level-up-menu-options']";
    }

    _getMenu () {
        return document.querySelector(this.locator);
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

    show() {
        this._getMenu().style.display = "block";
    }

    hide() {
        this._getMenu().style.display = "none";
    }

    clean() {
        this.hide();
    }
}