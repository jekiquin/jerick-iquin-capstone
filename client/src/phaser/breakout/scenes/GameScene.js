import { Scene } from 'phaser';
import { addPlayer } from '../utils/game-scene-utils';
import { initKeys, movePaddle } from '../utils/game-controls';


const BRICKTYPES = 7;

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'})
        this.gameState = {}
    }

    preload() {
        this.load.image('player', 'assets/sprites/breakoutmain.png');
        this.load.image('ball', 'assets/sprites/breakoutball.png');
        for (let i=1; i<=BRICKTYPES; i++) {
            this.load.image(`brick${i}`, `assets/sprites/breakout${i}.png`);
        }
        
    }

    create() {
        initKeys(this);
        addPlayer(this, 'player');

    }

    update() {
        movePaddle(this);

    }
}

export default GameScene;