import { Scene } from 'phaser';
import { addPlayer, addPlatform, addEnemies, addBoss, addColliders, genEnemyBullets, genEnemyMovement } from '../utils/game-scene-utils';
import { gameControls } from '../utils/game-controls'

// width: 540,
// height: 720
const ENEMY_FIRE_DELAY = 3500;
const BOSS_DELAY = 7000;

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'});
        this.gameState = {
            startTime: 0,
            bossStart: 0,
            enemyVelocity: 1,
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
        this.load.image('boss', 'assets/sprites/boss.png');
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
        addPlatform(this, 'platform');
        addEnemies(this, ['bug1', 'bug2', 'bug3', 'bug4', 'bug5']);
        genEnemyBullets(this, 'enemybullet');
        addBoss(this, 'boss');
        addColliders(this);
    }

    update(gameTime) {
        if (!this.gameState.active) {
            return
        }

        if (this.gameState.startTime === 0) {
            this.gameState.startTime = gameTime;
            return;
        }

        if (gameTime - this.gameState.startTime < ENEMY_FIRE_DELAY) {
            return;
        }

        if (this.gameState.bossStart === 0) {
            this.gameState.bossStart = gameTime;
        }

        if(this.gameState.pelletsLoop?.paused) {
            this.gameState.pelletsLoop.paused = false;
        }

        if(!this.gameState.enemies.visible) {
            this.gameState.enemies.setVisible(true);
        }

        if(!this.gameState.bossMove.isPlaying() && gameTime - this.gameState.bossStart > BOSS_DELAY) {
            this.gameState.bossMove.play();
        }
        
        gameControls(this, 'playerbullet');
        genEnemyMovement(this);
    }

}

export default GameScene;