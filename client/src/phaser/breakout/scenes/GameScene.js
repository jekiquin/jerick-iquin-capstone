import { Scene } from 'phaser';
import { gameInit, addPlayer, addBall, addPlatform, addBricks, addColliders } from '../utils/game-scene-utils';
import { initKeys, movePaddle } from '../utils/game-controls';


const BRICKTYPES = 7;

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'})
        this.gameState = {
            highScore: 0,
        }
    }

    preload() {
        this.load.image('platform', 'assets/images/platform.png')
        this.load.image('player', 'assets/sprites/breakoutmain.png');
        this.load.image('ball', 'assets/sprites/breakoutball.png');
        for (let i=1; i<=BRICKTYPES; i++) {
            this.load.image(`brick${i}`, `assets/sprites/breakout${i}.png`);
        }
    }

    create() {
        gameInit(this);
        addPlatform(this, 'platform');
        addPlayer(this, 'player');
        addBall(this, 'ball');
        addBricks(this);
        addColliders(this);
        initKeys(this);

    }

    update() {
        if (this.gameState.active) {
            movePaddle(this);
        }
    }
}

export default GameScene;