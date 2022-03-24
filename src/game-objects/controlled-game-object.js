import { GameObject } from "./game-object";

export class ControlledGameObject extends GameObject {
    constructor(params) {
        super({
            model: params.model, 
            hitboxStrategy: params.hitboxStrategy
        });
        this.controller = params.controller;
    }
}