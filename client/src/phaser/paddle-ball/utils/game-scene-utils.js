import Phaser from 'phaser';

const TEXT_STYLE = {fontFamily: 'Game', fontSize: '24px'};

export function addPaddles(scene) {
    const offset = 60;
    scene.gameState.player1 = scene.add.sprite(offset, scene.cameras.main.centerY, 'paddle').setScale(3);
    scene.gameState.player2 = scene.add.sprite(scene.cameras.main.displayWidth - offset, scene.cameras.main.centerY, 'paddle').setScale(3);
}

export function addPlatforms(scene, platform) {
    const offsetY = 34;
    const offSetX = 20;
    scene.gameState.platforms = scene.physics.add.staticGroup();
    scene.gameState.sideWall = [
        scene.gameState.platforms.create(scene.cameras.main.centerX, scene.cameras.main.displayHeight - offsetY, platform).setScale(2, 0.01).refreshBody(),
        scene.gameState.platforms.create(scene.cameras.main.centerX, offsetY, platform).setScale(2, 0.01).refreshBody()
    ]
}

export function initScores(scene) {
    scene.gameState.Score1 = 0;
    scene.gameState.Score2 = 0;
}

export function displayScores(scene) {
    scene.gameState.player1Display = scene.add.text(scene.cameras.main.centerX-70, 50, scoreDisplay(`${scene.gameState.Score1}`), TEXT_STYLE);
    scene.gameState.player2Display = scene.add.text(scene.cameras.main.centerX+70, 50, scoreDisplay(`${scene.gameState.Score1}`), TEXT_STYLE).setOrigin(1,0);
}

function scoreDisplay(score) {
    return score.padStart(2, '0');
}