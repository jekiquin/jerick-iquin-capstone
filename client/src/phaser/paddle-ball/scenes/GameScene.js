import { Scene } from 'phaser';
import { addPaddles, addPlatforms, initScores, displayScores } from '../utils/game-scene-utils';
import { initKeys, gameControls } from '../utils/game-controls';

const MAXSCORE = 15;

class GameScene extends Scene {
    constructor(){
        super({key: 'GameScene'});
        this.gameState = {
            ballActive: false,
            player1ToServe: true
        };
    }

    preload() {
        this.load.image('bg', 'assets/images/paddleboardbg.png');
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('platform', 'assets/images/platform.png')
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setScale(3.5,3);
        
        addPlatforms(this, 'platform')
        addPaddles(this);
        initScores(this);
        initKeys(this);
        
    }

    update() {
        gameControls(this); 
        displayScores(this);
    }
}

export default GameScene;