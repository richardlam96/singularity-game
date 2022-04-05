import * as THREE from 'three';
import { Vector3 } from 'three';

export class ThirdPersonCamera {
    constructor(params) {
        this._camera = params.camera;
        this._target = params.target;
        this._currentPosition = new Vector3();
        this._currentLookAt = new Vector3();
    }

    _calculateNewPosition() {
        return new THREE.Vector3(0, 10, 10)
            .applyEuler(this._target.rotation)
            .add(this._target.position);
    }

    _calculateNewLookAt() {
        return new THREE.Vector3(0, 0, -10)
            .applyEuler(this._target.rotation)
            .add(this._target.position);
    }

    setTarget(target) {
        this._target = target;
    }

    update() {
        let newPosition = this._calculateNewPosition();
        let newLookAt = this._calculateNewLookAt();

        this._currentPosition.lerp(newPosition, 0.1);
        this._currentLookAt.lerp(newLookAt, 0.1);

        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookAt);
    }
}