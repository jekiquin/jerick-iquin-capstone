import Phaser from 'phaser';

const SPEEDUP = 5;
const SPEEDDROP = 60;
const TEXT_STYLE = {fontFamily: 'Game', stroke: '#FF0000', strokeThickness: 2};

export function addTexts(scene) {
    scene.gameState.scoreText = scene.add.text(10, 700, `Score: ${scene.gameState.score}`, {...TEXT_STYLE, fontSize: '12px'}).setOrigin(0,0);
    scene.gameState.highScoreText = scene.add.text(530, 700, `High Score: ${scene.gameState.highScore}`, {...TEXT_STYLE, fontSize: '12px'}).setOrigin(1,0);

    // deleting texts
    scene.gameState.gameOverText?.destroy();
    scene.gameState.yesText?.destroy();
    scene.gameState.noText?.destroy();
}

export function addPlayer(scene, player) {
    scene.gameState.player = scene.physics.add.sprite(270,200, player).setScale(.17);
    scene.gameState.player.setPosition(scene.cameras.main.centerX, scene.cameras.main.centerY);
    scene.gameState.player.setCollideWorldBounds(true);

    scene.gameState.playerBullet = scene.physics.add.group();
}

export function addPlatform(scene, platform) {
    scene.gameState.platforms = scene.physics.add.staticGroup();
    scene.gameState.platforms.create(270, 700, platform).setScale(1, 0.01).refreshBody();
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
    scene.gameState.boss = scene.physics.add.sprite(0, 30, boss).setGravityY(-200).setScale(0.5);
    scene.gameState.boss.setOrigin(1,0);
    scene.gameState.bossMove = scene.tweens.add({
        targets: [scene.gameState.boss],
        x: 600,
        ease: 'Linear',
        duration: 6000,
        repeat: 5,
        yoyo: false,
        repeatDelay: 10000
    })
    scene.gameState.bossMove.stop();
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.player, scene.gameState.platforms);

    scene.physics.add.overlap(scene.gameState.playerBullet, scene.gameState.pellets, (bullet, pellet) => {
        if (Math.random() < 0.15) {
            scene.gameState.score += 1;
            displayScores(scene);
            bullet.destroy();
            pellet.destroy();
        }
    });


    scene.physics.add.collider(scene.gameState.playerBullet, scene.gameState.enemies, (bullet, enemy) => {
        switch(enemy.texture.key) {
            case 'bug1':
                scene.gameState.score += 20;
                break;
            case 'bug2':
                scene.gameState.score += 15;
                break;
            case 'bug3':
                scene.gameState.score += 10;
                break;
            case 'bug4':
                scene.gameState.score += 5;
                break;
            case 'bug5':
            default:
                scene.gameState.score += 2;
                break;
        }
        displayScores(scene);
        enemy.destroy();
        bullet.destroy();
        // console.log(enemy.texture.key);
    });

    scene.physics.add.overlap(scene.gameState.playerBullet, scene.gameState.bossMove.targets[0], (_, bullet) => {
        bullet.destroy();
        scene.gameState.bossMove.stop(0);
        scene.gameState.bossStart = 0;
        scene.gameState.score += 50;
        displayScores(scene);
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
        scene.gameState.playerBullet.getChildren().forEach(bullet => bullet.destroy());
        scene.gameState.pellets.getChildren().forEach(pellet => pellet.destroy());
        gamePlayEnd(scene);
        return
    }

    let drop = 10;
    if (totalEnemies === 1 && Math.abs(scene.gameState.enemyVelocity) !== SPEEDUP) {
        scene.gameState.enemyVelocity *= SPEEDUP;
        drop = SPEEDDROP;
    }

    const sortedEnemies = scene.gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
    scene.gameState.leftMostBug = sortedEnemies[0];
    scene.gameState.rightMostBug = sortedEnemies[sortedEnemies.length - 1];

    const isBoundary = scene.gameState.leftMostBug.x < 10 || scene.gameState.rightMostBug.x > 530;

    if(isBoundary) {
        scene.gameState.enemyVelocity *= -1;
    }

    scene.gameState.enemies.getChildren().forEach(enemy => {
        if(isBoundary) {
            enemy.y += drop; 
        }
        enemy.x += scene.gameState.enemyVelocity;
    });

}

function displayScores(scene) {
    scene.gameState.scoreText.setText(`Score: ${scene.gameState.score}`);
    scene.gameState.highScore = getHighScores(scene.gameState.score, scene.gameState.highScore);
    scene.gameState.highScoreText.setText(`High Score: ${scene.gameState.highScore}`);
}

function getHighScores(score, highScore) {
    return highScore >= score ? highScore : score;
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
    scene.gameState.score = 0;
    gameOverTexts(scene);
}

function gameOverTexts(scene) {
    scene.gameState.gameOverText = scene.add.text(270, 360, 'GAME OVER! PLAY AGAIN?', TEXT_STYLE).setOrigin(0.5, 0.5);
    scene.gameState.yesText = scene.add.text(270, 400, 'YES', TEXT_STYLE).setOrigin(0.5, 0.5).setInteractive();
    scene.gameState.noText = scene.add.text(270, 440, 'NO', TEXT_STYLE).setOrigin(0.5, 0.5).setInteractive();

    hoverOverTexts(scene.gameState.yesText);
    hoverOverTexts(scene.gameState.noText);

    scene.gameState.yesText.on('pointerup', () => {
        scene.scene.restart();
    })

    scene.gameState.noText.on('pointerup', () => {
        scene.scene.start('HomeScene');
    })
}

function hoverOverTexts(textObject) {
    textObject.on('pointerover', () => {
        textObject.setScale(1.2);
    });

    textObject.on('pointerout', () => {
        textObject.setScale(1);
    })
}
