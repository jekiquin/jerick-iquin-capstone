import Phaser from 'phaser';

const SPEEDUP = 3.5;

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

export function addBoss(scene, boss) {
    scene.gameState.boss?.destroy();
    scene.gameState.boss = scene.physics.add.sprite(0, 30, boss).setGravityY(-200).setScale(0.5).setVisible(false);

    scene.gameState.bossMove = scene.tweens.add({
        targets: scene.gameState.boss,
        x: 600,
        ease: 'Linear',
        duration: 6000,
        loop: -1,
        yoyo: false,
        loopDelay: 10000,
        onComplete: function() {scene.gameState.boss.destroy();}
    })
    

    scene.gameState.bossMove.pause();
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.player, scene.gameState.platforms);

    scene.physics.add.overlap(scene.gameState.playerBullet, scene.gameState.pellets, (bullet, pellet) => {
        if (Math.random() < 0.15) {
            bullet.destroy();
            pellet.destroy();
        }
    });


    scene.physics.add.collider(scene.gameState.playerBullet, scene.gameState.enemies, (bullet, enemy) => {
        enemy.destroy();
        bullet.destroy();
        // console.log(enemy.texture.key);
    });

    scene.physics.add.overlap(scene.gameState.pellets, scene.gameState.player, () => {
        gamePlayEnd(scene);
    })

    scene.physics.add.overlap(scene.gameState.enemies, scene.gameState.player, () => {
        gamePlayEnd(scene);
    })

    scene.physics.add.collider(scene.gameState.platforms, scene.gameState.enemies, () => {
        gamePlayEnd(scene);
    })
}

export function genPlayerBullets(scene, playerBullet) {
    scene.gameState.playerBullet.create(scene.gameState.player.x, scene.gameState.player.y, playerBullet).setScale(.5).setGravityY(-400);
}

export function genEnemyBullets(scene, enemyBullet) {
    scene.gameState.pelletsLoop = scene.time.addEvent({
        delay: 300,
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

    if (totalEnemies === 1 && Math.abs(scene.gameState.enemyVelocity) !== SPEEDUP) {
        scene.gameState.enemyVelocity *= SPEEDUP;
    }

    const sortedEnemies = scene.gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
    scene.gameState.leftMostBug = sortedEnemies[0];
    scene.gameState.rightMostBug = sortedEnemies[sortedEnemies.length - 1];

    if(scene.gameState.leftMostBug.x < 10 || scene.gameState.rightMostBug.x > 530) {
        scene.gameState.enemyVelocity *= -1;
    }

    scene.gameState.enemies.getChildren().forEach(enemy => {
        if(scene.gameState.leftMostBug.x < 10 || scene.gameState.rightMostBug.x > 530) {
            enemy.y += 10; 
        }
        enemy.x += scene.gameState.enemyVelocity;
    });

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
    scene.gameState.bossMove.stop();
    scene.gameState.bossStart = 0;
}
