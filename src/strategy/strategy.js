export class Strategy {
    execute() {
        throw new Error("Must implement execute() method for Strategy interface.");
    }
}

export class Context {
    constructor() {
        this._current;
    }

    set(strategy) {
        this._current = strategy;
    }

    get() {
        return this._current;
    }

    execute() {
        throw new Error("Must implement execute() method for Context interface.");
    }
}