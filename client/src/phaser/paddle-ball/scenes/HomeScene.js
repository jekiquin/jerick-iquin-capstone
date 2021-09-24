import { Scene } from 'phaser';
import { addStaticWalls, addBall, addColliders, addLogo, updateDisplay } from '../utils/home-scene-utils';

class HomeScene extends Scene {
    constructor() {
        super({key: 'HomeScene'});
        this.gameState = {};
    }

    preload() {
        this.load.image('logo', 'assets/images/ponglogo.png');
        this.load.image('ball', 'assets/images/paddle.png');
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('platform-vertical', 'assets/images/platformVertical.png');
    }

    create() {
        addLogo(this, 'logo')
        addStaticWalls(this, ['platform', 'platform-vertical']);
        addBall(this);
        addColliders(this);

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