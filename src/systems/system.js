export class System {
    constructor() {
        this.enabled = true;
    }

    enable() { this.enabled = true; }
    disable() { this.enabled = false; }
    toggle() { this.enabled = !this.enabled; }

    update() {}
}