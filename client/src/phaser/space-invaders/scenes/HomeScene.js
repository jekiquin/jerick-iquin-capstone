import { Scene } from 'phaser';
import { LOCAL_HOST } from '../../../utils/axiossetup';

const PULSATE_TIMING = 500;
const STOPPED_STATE = 1.25;

class HomeScene extends Scene {
    constructor() {
        super({key: 'HomeScene'});
        this.gameState = {
            pulsateTime: 0,
            pulsateToggle: true,
            logoRestStart: 0,
        }; 
    }

    preload() {
        this.load.image('bg', LOCAL_HOST + '/assets/images/spaceinvadersbg.jpg');
        this.load.image('logo', LOCAL_HOST + '/assets/images/spaceinvaderslogo.png');
        this.load.image('button', LOCAL_HOST + '/assets/images/spaceinvadersbutton.png');
        this.load.image('platform', LOCAL_HOST + '/assets/images/platform.png');
    }

    create() {
        this.gameState.hideButton = true;
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setOrigin(0.5, 0.5).setScale(1, 1.2);
        
        this.gameState.logo = this.physics.add.image(this.cameras.main.centerX, 0, 'logo').setScale(0.5).setOrigin(0.5, 0);

        this.gameState.startButton = this.add.image(this.cameras.main.centerX, 3*this.cameras.main.centerY/2, 'button').setScale(0.5).setInteractive().setVisible(false);

        this.gameState.startButton.on('pointerup', () => {
            this.scene.start('GameScene');
        })

        this.gameState.platforms = this.physics.add.staticGroup();
        this.gameState.platforms.create(270, 300, 'platform').setScale(1, 0.01).refreshBody();
        
        this.gameState.logo.setVelocity(0, 60);
        this.gameState.logo.setBounce(1, 0.6);
        this.physics.add.collider(this.gameState.logo, this.gameState.platforms);
    }

    update(gameTime) {
        if(gameTime - this.gameState.pulsateTime > PULSATE_TIMING) {
            this.gameState.pulsateTime = gameTime;
            const buttonScale = this.gameState.pulsateToggle ? 0.52 : 0.5;
            this.gameState.startButton.setScale(buttonScale);
            this.gameState.pulsateToggle = !this.gameState.pulsateToggle
        }

        if(this.gameState.hideButton && this.gameState.logo.body.acceleration.y === 0 && this.gameState.logo.body.velocity.y < -STOPPED_STATE) {

            this.gameState.hideButton = false;
            this.gameState.startButton.setVisible(true);
        }
    }
}

export default HomeScene;