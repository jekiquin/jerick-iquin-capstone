// import { Input } from 'phaser';

const PADDLE_SPEED = 600;
const BALLSPEED = 400;

export function initKeys(scene) {
    scene.gameState.keys = scene.input.keyboard.addKeys('W, S, up, down, space');
}

export function gameControls(scene) {
    // player 1 movement
    if (scene.gameState.keys.W.isDown) {
        scene.gameState.player1.setVelocityY(-PADDLE_SPEED);
    } else if (scene.gameState.keys.S.isDown) {
        scene.gameState.player1.setVelocityY(PADDLE_SPEED);
    } else {
        scene.gameState.player1.setVelocityY(0);
    }
    
    // player 2 movement
    if (scene.gameState.keys.up.isDown) {
        scene.gameState.player2.setVelocityY(-PADDLE_SPEED);
    } else if (scene.gameState.keys.down.isDown) {
        scene.gameState.player2.setVelocityY(PADDLE_SPEED);
    } else {
        scene.gameState.player2.setVelocityY(0);
    }

    if (scene.gameState.keys.space.isDown && !scene.gameState.ballActive) {
    //    ball movement
        const velocityX = scene.gameState.player1ToServe ? -BALLSPEED : BALLSPEED;
        scene.gameState.ball.setVelocity(velocityX,0);
        scene.gameState.ballActive = !scene.gameState.ballActive;
    }
}
