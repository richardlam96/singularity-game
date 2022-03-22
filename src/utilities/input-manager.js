export class InputManager {
    constructor() {
        this.keys = {
            arrowUp: false,
            arrowDown: false,
            arrowLeft: false,
            arrowRight: false
        }

        document.addEventListener('keydown', this._onKeyDown);
        document.addEventListener('keyup', this._onKeyUp);
    }

    _onKeyDown = (event) => {
        switch(event.key) {
           case "ArrowUp":
                this.keys.arrowUp = true;
                break;
            case "ArrowDown":
                this.keys.arrowDown = true;
                break;
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
            case "ArrowUp":
                this.keys.arrowUp = false;
                break;
            case "ArrowDown":
                this.keys.arrowDown = false;
                break;
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