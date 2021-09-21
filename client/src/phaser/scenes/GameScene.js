import { Scene, Input } from 'phaser';
import {addPlayer, addPlatform, addEnemies, addColliders} from '../utils/game-scene-utils';

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
        this.load.image('enemybullet', 'assets/sprites/enemybullet.png');
        this.load.image('platform', 'assets/images/platform.png');
    }

    create() {
        const {gameState} = this;
        gameState.cursors = this.input.keyboard.createCursorKeys();

        addPlayer(this);
        addPlatform(this);
        addEnemies(this);
        addColliders(this);
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

}

export default GameScene;