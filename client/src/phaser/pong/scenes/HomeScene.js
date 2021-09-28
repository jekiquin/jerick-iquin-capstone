import { Scene } from 'phaser';
import { addStaticWalls, addBall, addColliders, addLogo, updateDisplay, pressToPlay } from '../utils/home-scene-utils';
import { LOCAL_HOST } from '../../../utils/axiossetup';

class HomeScene extends Scene {
    constructor() {
        super({key: 'HomeScene'});
        this.gameState = {};
    }

    preload() {
        this.load.image('logo', LOCAL_HOST + '/assets/images/ponglogo.png');
        this.load.image('ball', LOCAL_HOST + '/assets/images/paddle.png');
        this.load.image('platform', LOCAL_HOST + '/assets/images/platform.png');
        this.load.image('platform-vertical', LOCAL_HOST + '/assets/images/platformVertical.png');
    }

    create() {
        addLogo(this, 'logo')
        addStaticWalls(this, ['platform', 'platform-vertical']);
        addBall(this);
        addColliders(this);
        pressToPlay(this);
    }

    update(gameTime) {
        if(this.gameState.logoScale < 1) {
            this.gameState.logoScale += 0.01;
            this.gameState.logo.setScale(this.gameState.logoScale);
            return
        }
        updateDisplay(this, gameTime);
    }
}

export default HomeScene;