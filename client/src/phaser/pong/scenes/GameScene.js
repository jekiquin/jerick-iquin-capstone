import { Scene } from 'phaser';
import { addPaddles, addPlatforms, addBall, addColliders, initTextDisplay, initScores, ballOut } from '../utils/game-scene-utils';
import { initKeys, gameControls } from '../utils/game-controls';
import { LOCAL_HOST } from '../../../utils/axiossetup';

class GameScene extends Scene {
    constructor(){
        super({key: 'GameScene'});
        this.gameState = {};
    }

    preload() {
        this.load.image('bg', LOCAL_HOST + '/assets/images/paddleboardbg.png');
        this.load.image('paddle', LOCAL_HOST + '/assets/images/paddle.png');
        this.load.image('platform', LOCAL_HOST + '/assets/images/platform.png');
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