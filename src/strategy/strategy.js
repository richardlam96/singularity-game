export class Strategy {
    execute() {
        throw new Error("Must implement execute() method for Strategy interface.");
    }
}

export class Context {
    constructor() {
        this._currentStrategy;
    }

    setStrategy(strategy) {
        this._currentStrategy = strategy;
    }

    getStrategy() {
        return this._current;
    }

    executeStrategy() {
        throw new Error("Must implement execute() method for Context interface.");
    }
}