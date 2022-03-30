export class LevelUpMenuUI {
    constructor(stats) {
        this.locator = "div[id='level-up-menu']";
        this.optionsListLocator = "div[id='level-up-menu-options']";
        this._playerStats = stats;
        this._init();
    }

    _init() {
        for (const [attr, value] of Object.entries(this._playerStats)) {
            let buttonText = attr + ' - ' + value;
            let onClick = () => this._playerStats[attr] += 1;
            this.addMenuOption(buttonText, onClick);
        }
    }

    _getList() {
        return document.querySelector(this.optionsListLocator);
    }

    addMenuOption(name, callback) {
        let newMenuOption = document.createElement('button');
        newMenuOption.textContent = name;
        newMenuOption.onclick = callback;
        this._getList().appendChild(newMenuOption);
    }
}