export class LevelUpMenuUI {
    constructor(options) {
        this.locator = "div[id='level-up-menu']";
        this.optionsListLocator = "div[id='level-up-menu-options']";
        this._options = options;
        this._init();
    }

    _init() {
        for (const [attr, value] of Object.entries(this._options)) {
            let buttonText = attr + ' - ' + value;
            let onClick = () => {
                this._options[attr] += 1;
                console.log(attr, this._options[attr]);
            }
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