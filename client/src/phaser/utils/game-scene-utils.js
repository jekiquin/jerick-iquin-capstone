import Phaser from 'phaser';

export function addPlayer(scene, player) {
    scene.gameState.player = scene.physics.add.sprite(270,200, player).setScale(.5);
    scene.gameState.player.setPosition(scene.cameras.main.centerX, 0);
    scene.gameState.player.setCollideWorldBounds(true);

    scene.gameState.playerBullet = scene.physics.add.group();
}

export function addPlatform(scene) {
    scene.gameState.platforms = scene.physics.add.staticGroup();
    scene.gameState.platforms.create(270, 719, 'platform').refreshBody();
}

export function addEnemies(scene, enemies) {
    scene.gameState.enemies = scene.physics.add.group();
    for (let yEnemies=1; yEnemies<6; yEnemies++) {
        const yOff = yEnemies === 1 ? 150 : 50;
        for (let xEnemies=1; xEnemies<11; xEnemies++) {
            scene.gameState.enemies.create(50*xEnemies, yOff*yEnemies, enemies[yEnemies-1]).setScale(.3).setGravityY(-200);
        }
    }

    scene.gameState.pellets = scene.physics.add.group();
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.player, scene.gameState.platforms);

    scene.physics.add.collider(scene.gameState.playerBullet, scene.gameState.enemies, (bullet, enemy) => {
        enemy.destroy();
        bullet.destroy();
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
        loop: true
    });
}

function genPellet(gameState, pellets, enemyBullet) {
    const randomBug = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());
    pellets.create(randomBug.x, randomBug.y, enemyBullet).setScale(.3);
}

