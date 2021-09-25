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
}

export function addPlatform(scene, platform) {
    scene.gameState.platforms = scene.physics.add.staticGroup();
    scene.gameState.platforms.create(scene.cameras.main.centerX, 690, platform).setScale(1, 0.01).refreshBody();
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.ball, scene.gameState.player, () => {
        const velocityX = scene.gameState.ball.body.velocity.x + 2*scene.gameState.player.body.velocity.x/5;
        scene.gameState.ball.setVelocityX(velocityX);
    });

    scene.physics.add.collider(scene.gameState.ball, scene.gameState.bricks, (ball, brick) => {
        brick.destroy();
     });
}

export function addBricks(scene) {
    scene.gameState.bricks = scene.physics.add.group();
    for(let yBricks=1; yBricks<8; yBricks++) {
        for (let xBricks=1; xBricks<16; xBricks++) {
            scene.gameState.bricks.create(34*xBricks, 50+17*yBricks, `brick${yBricks}`).setImmovable(true);
        }
    }
}
