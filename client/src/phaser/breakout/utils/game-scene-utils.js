import Phaser from 'phaser';

const MAX_VELOCITY = 600;

export function addPlayer(scene, player) {
    scene.gameState.player = scene.physics.add.sprite(scene.cameras.main.centerX, scene.cameras.main.displayHeight - 50, player);
    scene.gameState.player.setCollideWorldBounds(true);
    scene.gameState.player.body.immovable = true;
    scene.gameState.player.body.setMaxVelocityX(MAX_VELOCITY);
    
}

export function addBall(scene, ball) {
    scene.gameState.ball = scene.physics.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, ball);
    scene.gameState.ball.setCollideWorldBounds(true);
    scene.gameState.ball.setBounce(1,1);
    scene.gameState.ball.setVelocityY(200);
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.ball, scene.gameState.player, () => {
        const velocityX = scene.gameState.ball.body.velocity.x + 3*scene.gameState.player.body.velocity.x/5;
        scene.gameState.ball.setVelocityX(velocityX);
    });
}

