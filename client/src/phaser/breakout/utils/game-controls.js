const PADDLE_ACC = 2000;
const BASE_BALLSPEED = -300;

export function initKeys(scene) {
    scene.gameState.cursors = scene.input.keyboard.createCursorKeys();
}

export function movePaddle(scene) {
    if(scene.gameState.cursors.right.isDown) {
        scene.gameState.player.setAccelerationX(PADDLE_ACC);
    } else if (scene.gameState.cursors.left.isDown) {
        scene.gameState.player.setAccelerationX(-PADDLE_ACC);
    } 
    else {
        scene.gameState.player.setVelocityX(0);
        scene.gameState.player.setAccelerationX(0);
    }

    if (scene.gameState.cursors.space.isDown) {
        if (!scene.gameState.ballActive) {
            scene.gameState.ball.setVelocityY(-BASE_BALLSPEED);
            scene.gameState.ballActive = true;
        }
    }
}