// import { Input } from 'phaser';

export function initKeys(scene) {
    scene.gameState.keys = scene.input.keyboard.addKeys('W, S, up, down, space');
}

export function gameControls(scene) {
    if (scene.gameState.keys.up.isDown) {
        scene.gameState.player2.y -= 10;
    }

    if (scene.gameState.keys.down.isDown) {
        scene.gameState.player2.y += 10;
    }

    if (scene.gameState.keys.W.isDown) {
        scene.gameState.player1.y -= 10;
    }

    if (scene.gameState.keys.S.isDown) {
        scene.gameState.player1.y += 10;
    }

    if (scene.gameState.keys.space.isDown) {
    //    ball movement
    }
}