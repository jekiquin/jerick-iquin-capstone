import Phaser from 'phaser';

const TEXT_STYLE = {fontFamily: 'Game', fontSize: '24px'};

export function addPaddles(scene) {
    const offset = 60;
    scene.gameState.player1 = scene.physics.add.sprite(offset, scene.cameras.main.centerY, 'paddle').setScale(3);
    scene.gameState.player2 = scene.physics.add.sprite(scene.cameras.main.displayWidth - offset, scene.cameras.main.centerY, 'paddle').setScale(3);
}

export function addPlatforms(scene, platform) {
    const offsetY = 34;
    scene.gameState.platforms = scene.physics.add.staticGroup();

    // scene.gameState.sideWallDown = scene.gameState.platforms.create(scene.cameras.main.centerX, scene.cameras.main.displayHeight - offsetY, platform).setScale(2, 0.01).refreshBody();
    // scene.gameState.sideWallUp = scene.gameState.platforms.create(scene.cameras.main.centerX, offsetY, platform).setScale(2, 0.01).refreshBody()
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

export function addColliders(scene) {
    // scene.physics.add.collider(scene.gameState.sideWallDown, scene.gameState.player1);
    // scene.physics.add.collider(scene.gameState.sideWallUp, scene.gameState.player1);
    // scene.physics.add.collider(scene.gameState.sideWallDown, scene.gameState.player1);
    // scene.physics.add.collider(scene.gameState.sideWallUp, scene.gameState.player1);
    scene.gameState.sideWall.forEach(wall => {
        scene.physics.add.collider(wall, scene.gameState.player1);
        scene.physics.add.collider(wall, scene.gameState.player2);
    })

}

function scoreDisplay(score) {
    return score.padStart(2, '0');
}