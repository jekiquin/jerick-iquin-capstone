import { Scene } from 'phaser';
import { gameInit, addPlayer, addBall, addPlatform, addBricks, initTextDisplay, addColliders, updateScoreDisplay } from '../utils/game-scene-utils';
import { initKeys, movePaddle } from '../utils/game-controls';
import { LOCAL_HOST } from '../../../utils/axiossetup';


const BRICKTYPES = 7;

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'})
        this.gameState = {
            highScore: 0,
        }
    }

    preload() {
        
        this.load.image('platform', LOCAL_HOST + '/assets/images/platform.png')
        this.load.image('player', LOCAL_HOST + '/assets/sprites/breakoutmain.png');
        this.load.image('ball', '/assets/sprites/breakoutball.png');
        for (let i=1; i<=BRICKTYPES; i++) {
            this.load.image(`brick${i}`, `${LOCAL_HOST}/assets/sprites/breakout${i}.png`);
        }
        this.load.image('bg', LOCAL_HOST + '/assets/images/breakoutbg.jpg');
    }

    create() {
        this.add.image(0,0, 'bg').setOrigin(0,0);
        gameInit(this);
        addPlatform(this, 'platform');
        addPlayer(this, 'player');
        addBall(this, 'ball');
        addBricks(this);
        addColliders(this);
        initKeys(this);
        initTextDisplay(this);
    }

    update() {
        if (this.gameState.active) {
            movePaddle(this);
            updateScoreDisplay(this);
        }
    }
}

export default GameScene;