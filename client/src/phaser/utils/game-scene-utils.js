import Phaser from 'phaser';

export function addPlayer(scene) {
    scene.gameState.player = scene.physics.add.sprite(270,200,'ship').setScale(.5);
    scene.gameState.player.setPosition(scene.cameras.main.centerX, 0);
    scene.gameState.player.setCollideWorldBounds(true);

    // player bullets
    scene.gameState.playerBullet = scene.physics.add.group();
}

export function addPlatform(scene) {
    scene.gameState.platforms = scene.physics.add.staticGroup();
    scene.gameState.platforms.create(270, 719, 'platform').refreshBody();
}

export function addEnemies(scene) {
    scene.gameState.enemies = scene.physics.add.group();
    for (let yEnemies=1; yEnemies<6; yEnemies++) {
        const yOff = yEnemies === 1 ? 150 : 50;
        for (let xEnemies=1; xEnemies<11; xEnemies++) {
            scene.gameState.enemies.create(50*xEnemies, yOff*yEnemies, `bug${yEnemies}`).setScale(.3).setGravityY(-200);
        }
    }

    const pellets = scene.physics.add.group();

    scene.gameState.pelletsLoop = scene.time.addEvent({
        delay: 500,
        callback: () => genPellet(scene.gameState, pellets),
        callbackScope: scene,
        loop: true
    });
    // enemy bullets
}

function genPellet(gameState, pellets) {
    const randomBug = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());
    pellets.create(randomBug.x, randomBug.y, 'enemybullet').setScale(.3);
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.player, scene.gameState.platforms);

    scene.physics.add.collider(scene.gameState.playerBullet, scene.gameState.enemies, (bullet, enemy) => {
        enemy.destroy();
        bullet.destroy();
    })
}