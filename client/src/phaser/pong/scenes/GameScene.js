import { Scene } from 'phaser';
import { addPaddles, addPlatforms, addBall, addColliders, initTextDisplay, initScores, ballOut } from '../utils/game-scene-utils';
import { initKeys, gameControls } from '../utils/game-controls';

class GameScene extends Scene {
    constructor(){
        super({key: 'GameScene'});
        this.gameState = {};
    }

    preload() {
        this.load.image('bg', 'assets/images/paddleboardbg.png');
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('platform', 'assets/images/platform.png');
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setScale(3.5,3);
        this.gameState.ballActive = false;
        this.gameState.gameActive = true;
        this.gameState.player1ToServe = true
        
        addPlatforms(this, 'platform');
        addPaddles(this, 'paddle');
        addBall(this, 'paddle');
        addColliders(this);
        initScores(this);
        initKeys(this);
        initTextDisplay(this);
        
    }

    update() {
        if (this.gameState.gameActive) {
            gameControls(this); 
            ballOut(this);
        }
 
    }
}

export default GameScene;