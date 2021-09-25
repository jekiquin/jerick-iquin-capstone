import Phaser from 'phaser';

const DELAY = 20;

export function genBrickDestroy(scene) {
    scene.gameState.brickDestroy = scene.time.addEvent({
        delay: DELAY,
        callback: () => destroyBrick(scene.gameState.bricks, scene.gameState.brickDestroy),
        callbackScope: scene,
        loop: true,
        paused: true
    })
}

function destroyBrick(bricks, destroyFunc) {
    const allBricks = bricks.getChildren();
    const randomBrick = Phaser.Utils.Array.GetRandom(allBricks);
    if (!randomBrick) {
        destroyFunc.destroy();
        return
    }
    randomBrick.destroy();
}