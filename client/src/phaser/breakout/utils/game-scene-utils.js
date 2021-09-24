import Phaser from 'phaser';

export function addPlayer(scene, player) {
    scene.gameState.player = scene.physics.add.sprite(scene.cameras.main.centerX, scene.cameras.main.displayHeight - 50, player);
    scene.gameState.player.immovable = true;
    scene.gameState.player.setCollideWorldBounds(true);
}
