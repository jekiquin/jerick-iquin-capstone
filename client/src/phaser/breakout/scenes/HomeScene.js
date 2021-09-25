import { Scene } from 'phaser';
import { addBricks } from '../utils/game-scene-utils';
import { genBrickDestroy } from '../utils/home-scene-utils';

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
        this.load.image('logo', 'assets/images/breakoutlogo.png');
        this.load.image('platform', 'assets/images/platform.png');
        for (let i=1; i<=BRICKTYPES; i++) {
            this.load.image(`brick${i}`, `assets/sprites/breakout${i}.png`);
        }
    }

    create() {
        this.add.image(this.cameras.main.centerX, 120, 'logo').setScale(.8, 1);
        addBricks(this);
        genBrickDestroy(this);
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

        if(this.gameState.brickDestroy?.paused) {
            this.gameState.brickDestroy.paused = false 
        }
        
    }
}

export default HomeScene;