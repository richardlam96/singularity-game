export class SystemBase {
    constructor(entities) {
        this._entities = entities;
        this._relatedComponents = [];
    }

    _getRelatedEntities() {
        return this._entities.filter(entity => {
            for (let component of this._relatedComponents) {
                if (entity.components[component] === undefined) {
                    return false;
                }
            }
            return true;
        })
    }

    onUpdate() {}
}