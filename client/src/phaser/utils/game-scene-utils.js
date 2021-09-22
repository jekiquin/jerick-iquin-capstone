import Phaser from 'phaser';

const FACTOR_REF = 50;

export function addPlayer(scene, player) {
    scene.gameState.player = scene.physics.add.sprite(270,200, player).setScale(.17);
    scene.gameState.player.setPosition(scene.cameras.main.centerX, scene.cameras.main.centerY);
    scene.gameState.player.setCollideWorldBounds(true);

    scene.gameState.playerBullet = scene.physics.add.group();
}

export function addPlatform(scene) {
    scene.gameState.platforms = scene.physics.add.staticGroup();
    scene.gameState.platforms.create(270, 719, 'platform').refreshBody();
}

export function addEnemies(scene, enemies) {
    scene.gameState.enemies?.destroy();
    scene.gameState.enemies = scene.physics.add.group();
    for (let yEnemies=1; yEnemies<6; yEnemies++) {
        for (let xEnemies=1; xEnemies<11; xEnemies++) {
            scene.gameState.enemies.create(50*xEnemies, 50+50*yEnemies, enemies[yEnemies-1]).setScale(.3).setGravityY(-200);
        }
    }
    scene.gameState.enemies.setVisible(false)

    scene.gameState.pellets = scene.physics.add.group();
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.playerBullet, scene.gameState.enemies, (bullet, enemy) => {
        enemy.destroy();
        bullet.destroy();
    });

    scene.physics.add.overlap(scene.gameState.pellets, scene.gameState.player, () => {
        gamePlayEnd(scene);
    })

    scene.physics.add.overlap(scene.gameState.enemies, scene.gameState.player, () => {
        gamePlayEnd(scene);
    })
}

export function genPlayerBullets(scene, playerBullet) {
    scene.gameState.playerBullet.create(scene.gameState.player.x, scene.gameState.player.y, playerBullet).setScale(.5).setGravityY(-400);
}

export function genEnemyBullets(scene, enemyBullet) {
    scene.gameState.pelletsLoop = scene.time.addEvent({
        delay: 500,
        callback: () => genPellet(scene.gameState, scene.gameState.pellets, enemyBullet),
        callbackScope: scene,
        loop: true,
        paused: true
    });
}

export function genEnemyMovement(scene) {
    const totalEnemies = scene.gameState.enemies?.getChildren().length;
    if(!totalEnemies) {
        gamePlayEnd(scene);
        return
    }

    scene.gameState.enemies.getChildren().forEach(enemy => {
        enemy.x += scene.gameState.enemyVelocity;
    });

    const sortedEnemies = scene.gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
    scene.gameState.leftMostBug = sortedEnemies[0];
    scene.gameState.rightMostBug = sortedEnemies[sortedEnemies.length - 1];
    if(scene.gameState.leftMostBug.x < 10 || scene.gameState.rightMostBug.x > 530) {
        scene.gameState.enemyVelocity *= -1;
        scene.gameState.enemies.getChildren().forEach(enemy => {
            enemy.y += 10;
        })
    }
}

function genPellet(gameState, pellets, enemyBullet) {
    const randomBug = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());
    if(!randomBug) {
        return;
    }
    pellets.create(randomBug.x, randomBug.y, enemyBullet).setScale(.3);
}

function gamePlayEnd(scene) {
    scene.gameState.active = false;
    scene.physics.pause();
    scene.gameState.enemyVelocity = 1;
    scene.gameState.enemyVelocityFactor = 1;
    scene.gameState.pelletsLoop?.destroy();
    scene.gameState.startTime = 0;
}
