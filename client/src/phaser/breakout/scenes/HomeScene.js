import { Scene } from 'phaser';
import { addBricks,addBall, addColliders } from '../utils/game-scene-utils';
import { LOCAL_HOST } from '../../../utils/axiossetup';

const BRICKTYPES = 7;
const DELAYSTART = 1000;

class HomeScene extends Scene {
    constructor(){
        super({key: 'HomeScene'})
        this.gameState = {
            startTime: 0
        }
    }

    preload() {

        this.load.image('logo', LOCAL_HOST + '/assets/images/breakoutlogo.png');
        this.load.image('platform', LOCAL_HOST + '/assets/images/platform.png');
        this.load.image('ball', LOCAL_HOST + '/assets/sprites/breakoutball.png');
        for (let i=1; i<=BRICKTYPES; i++) {
            this.load.image(`brick${i}`, `${LOCAL_HOST}/assets/sprites/breakout${i}.png`);
        }
        this.load.image('bg', LOCAL_HOST + '/assets/images/breakoutbg.jpg');
    }

    create() {
        this.add.image(0,0, 'bg').setOrigin(0,0)
        this.add.image(this.cameras.main.centerX, 120, 'logo').setScale(.8, 1);
        addBricks(this);
        addBall(this,'ball');
        addColliders(this);
        this.gameState.ball.setVelocity(
            1000+Math.random()*600,
            1000+Math.random()*600
        )

        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Press anywhere to play!',{fontFamily: 'Game'}).setOrigin(0.5, 0);

        this.input.on('pointerup', () => {
            this.scene.start('GameScene');
        })
        
    }

    update(gameTime) {
        if (!this.gameState.startTime) {
            this.gameState.startTime = gameTime;
            return;
        }

        if(gameTime - this.gameState.startTime < DELAYSTART) {
            return;
        }

        
        
    }
}

export default HomeScene;