import { System } from './system';

export class BehaviorSystem extends System {
    constructor(movingObjects) {
        super();
        this._movingObjects = movingObjects;
    }

    update() {
        this._movingObjects.forEach(object => {
            object.behavior.execute(object, object.stats.speed);
        });
    }
}