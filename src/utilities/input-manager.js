export class InputManager {
    constructor() {
        this.keys = {
            arrowLeft: false,
            arrowRight: false
        }

        document.addEventListener('keydown', this._onKeyDown);
        document.addEventListener('keyup', this._onKeyUp);
    }

    _onKeyDown = (event) => {
        switch(event.key) {
           case "ArrowLeft":
                this.keys.arrowLeft = true;
                break;
            case "ArrowRight":
                this.keys.arrowRight = true;
                break;
            default:
                break;
        }
    }

    _onKeyUp = (event) => {
        switch(event.key) {
            case "ArrowLeft":
                this.keys.arrowLeft = false;
                break;
            case "ArrowRight":
                this.keys.arrowRight = false;
                break;
            default:
                break;
        }
    }
}