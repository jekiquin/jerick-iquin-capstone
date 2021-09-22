import { Scene } from 'phaser';
import { addPlayer, addPlatform, addEnemies, addColliders, genEnemyBullets, genEnemyMovement } from '../utils/game-scene-utils';
import { gameControls } from '../utils/game-controls'

// width: 540,
// height: 720

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'});
        this.gameState = {
            startTime: 0,
            enemyVelocity: 1,
            enemyFireDelay: 3500,
            score: 0
        }
    }


    preload() {
        this.load.image('ship', 'assets/sprites/ship.ico');
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
        this.gameState.active = true;
        this.gameState.cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerup', () => {
            if (!this.gameState.active) {
                this.scene.restart();
            }
        })

        addPlayer(this, 'ship', 'playerbullet');
        addEnemies(this, ['bug1', 'bug2', 'bug3', 'bug4', 'bug5']);
        addPlatform(this, 'platform');
        addColliders(this);
        genEnemyBullets(this, 'enemybullet');
    }

    update(gameTime) {
        if (!this.gameState.active) {
            return
        }

        if (this.gameState.startTime === 0) {
            this.gameState.startTime = gameTime;
            return;
        }

        if (gameTime - this.gameState.startTime < this.gameState.enemyFireDelay) {
            return;
        }

        if(this.gameState.pelletsLoop.paused) {
            this.gameState.pelletsLoop.paused = false;
        }

        if(!this.gameState.enemies.visible) {
            this.gameState.enemies.setVisible(true);
        }
        gameControls(this, 'playerbullet');
        genEnemyMovement(this);
    }

}

export default GameScene;