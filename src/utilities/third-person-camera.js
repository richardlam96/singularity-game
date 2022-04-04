import * as THREE from 'three';
import { Vector3 } from 'three';

export class ThirdPersonCamera {
    constructor(params) {
        this._camera = params.camera;
        this._target = params.target;
        this._currentPosition = new Vector3();
        this._currentLookAt = new Vector3();
    }

    _calculateNewPosition(positionOffsetVector) {
        return positionOffsetVector
            .applyEuler(this._target.rotation)
            .add(this._target.position);
    }

    _calculateNewLookAt(lookAtOffsetVector) {
        return lookAtOffsetVector
            .applyEuler(this._target.rotation)
            .add(this._target.position);
    }

    setTarget(target) {
        this._target = target;
    }

    update() {
        let newPosition = this._calculateNewPosition(new THREE.Vector3(0, 10, 10));
        let newLookAt = this._calculateNewLookAt(new THREE.Vector3(0, 0, -10));

        this._currentPosition.lerp(newPosition, 0.1);
        this._currentLookAt.lerp(newLookAt, 0.1);

        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookAt);
    }
}