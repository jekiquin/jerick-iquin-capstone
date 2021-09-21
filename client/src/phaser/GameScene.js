import { Scene, Input } from 'phaser';

// width: 540,
// height: 720

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'});
        this.gameState = {}
    }


    preload() {
        this.load.image('ship', 'assets/sprites/ship.png');
        this.load.image('playerbullet', 'assets/sprites/playerbullet.png');
        this.load.image('boss', 'assets/sprites/boss.png');
        this.load.image('bug1', 'assets/sprites/bug1.png');
        this.load.image('bug2', 'assets/sprites/bug2.png');
        this.load.image('bug3', 'assets/sprites/bug3.png');
        this.load.image('bug4', 'assets/sprites/bug4.png');
        this.load.image('bug5', 'assets/sprites/bug5.png');
        this.load.image('platform', 'assets/images/platform.png');
    }

    create() {
        const {gameState} = this;
        gameState.cursors = this.input.keyboard.createCursorKeys();

        this.addPlayer();
        this.addPlatform();

        this.addEnemies();

        this.physics.add.collider(gameState.playerBullet, gameState.enemies, (bullet, enemy) => {
            enemy.destroy();
            bullet.destroy();
        })
    }

    update() {
        // player controls
        if (this.gameState.cursors.left.isDown) {
            this.gameState.player.setVelocityX(-160);
        } else if (this.gameState.cursors.right.isDown) {
            this.gameState.player.setVelocityX(160);
        } else {
            this.gameState.player.setVelocityX(0);
        }
        
        // player shot
        if (Input.Keyboard.JustDown(this.gameState.cursors.space)) {
            this.gameState.playerBullet.create(this.gameState.player.x, this.gameState.player.y, 'playerbullet').setScale(.5).setGravityY(-400);
        }
    }

    addPlayer() {
        this.gameState.player = this.physics.add.sprite(270,200,'ship').setScale(.5);
        this.gameState.player.setPosition(this.cameras.main.centerX, 0);
        this.gameState.player.setCollideWorldBounds(true);

        this.gameState.playerBullet = this.physics.add.group();
    }

    addPlatform() {
        this.gameState.platforms = this.physics.add.staticGroup();
        this.gameState.platforms.create(270, 719, 'platform').refreshBody();
    }

    addEnemies() {
        this.gameState.enemies = this.physics.add.group();
        for (let yEnemies=1; yEnemies<6; yEnemies++) {
            for (let xEnemies=1; xEnemies<11; xEnemies++) {
                this.gameState.enemies.create(50*xEnemies, 50*yEnemies, `bug${yEnemies}`).setScale(.3).setGravityY(-200);
            }
        }
    }

    addColliders() {
        this.physics.add.collider(this.gameState.player, this.gameState.platforms);
    }
}

export default GameScene;