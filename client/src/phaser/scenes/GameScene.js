import { Scene, Input } from 'phaser';
import { addPlayer, addPlatform, addEnemies, addColliders, genEnemyBullets } from '../utils/game-scene-utils';
import { gameControls } from '../utils/game-controls'

// width: 540,
// height: 720

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'});
        this.gameState = {
            score: 0,
        }
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

        addPlayer(this, 'ship', 'playerbullet');
        addPlatform(this, 'platform');
        addEnemies(this, ['bug1', 'bug2', 'bug3', 'bug4', 'bug5']);
        genEnemyBullets(this, 'enemybullet')
        addColliders(this);
    }

    update() {
        gameControls(this, 'playerbullet')
    }

}

export default GameScene;