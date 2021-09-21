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
        gameState.player = this.physics.add.sprite(270,200,'ship').setScale(.5);
        gameState.player.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        gameState.playerBullet = this.physics.add.group();
        
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // creating platform
        const platforms = this.physics.add.staticGroup();
        platforms.create(270, 719, 'platform').refreshBody();

        // platform boundary
        gameState.player.setCollideWorldBounds(true);
	    this.physics.add.collider(gameState.player, platforms);
    }

    update() {
        const {gameState} = this;

        // player controls
        if (gameState.cursors.left.isDown) {
            gameState.player.setVelocityX(-160);
        } else if (gameState.cursors.right.isDown) {
            gameState.player.setVelocityX(160);
        } else {
            gameState.player.setVelocityX(0);
        }
        
        // player shot
        if (Input.Keyboard.JustDown(gameState.cursors.space)) {
            gameState.playerBullet.create(gameState.player.x, gameState.player.y, 'playerbullet').setScale(.5).setGravityY(-400);
        }
    }
}

export default GameScene;