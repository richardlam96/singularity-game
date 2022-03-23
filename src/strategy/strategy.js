export class Strategy {
    execute() {
        throw new Error("Must implement execute() method for Strategy interface.");
    }
}

export class Context {
    constructor(data) {
        this.data = data;
        this._currentStrategy;
    }

    setStrategy(strategy) {
        this._currentStrategy = strategy;
    }

    getStrategy() {
        return this._current;
    }

    executeStrategy() {
        this._currentStrategy.execute(this.data);
    }
}