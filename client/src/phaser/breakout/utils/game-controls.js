const PADDLE_SPEED = 600;
const BASE_BALLSPEED = 400;

export function initKeys(scene) {
    scene.gameState.cursors = scene.input.keyboard.createCursorKeys();
}

export function movePaddle(scene) {
    if(scene.gameState.cursors.right.isDown) {
        scene.gameState.player.setVelocityX(PADDLE_SPEED);
    } else if (scene.gameState.cursors.left.isDown) {
        scene.gameState.player.setVelocityX(-PADDLE_SPEED);
    } else {
        scene.gameState.player.setVelocityX(0);
    }
}