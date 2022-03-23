export class CollisionSystem {
    constructor(params) {
        this.player = params.player;
        this.obstacles = params.obstacles;
    }

    _objectsCollide(driver, obstacle) {
        let obstacleBottomZ = obstacle.model.position.z + (obstacle.geometry.parameters.depth / 2);
        let obstacleLeftX = obstacle.model.position.x - (obstacle.geometry.parameters.width / 2);
        let obstacleRightX = obstacle.model.position.x + (obstacle.geometry.parameters.width / 2);

        let driverTopZ = driver.model.position.z - (driver.model.mesh.geometry.parameters.depth / 2);
        let driverLeftX = driver.model.position.x - (driver.model.mesh.geometry.parameters.width / 2);
        let driverRightX = driver.model.position.x + (driver.model.mesh.geometry.parameters.width / 2);

        return (
            obstacleBottomZ >= driverTopZ
            && (
                (obstacleLeftX >= driverLeftX && obstacleLeftX <= driverRightX)
                || (obstacleRightX >= driverLeftX && obstacleRightX <= driverRightX)
            )
        );


    }

    update() {
        this.obstacles.forEach(obstacle => {
            if (this._objectsCollide(this.player, obstacle)) {
                console.log("player and obstacle collided");
            }
        })
    }
}