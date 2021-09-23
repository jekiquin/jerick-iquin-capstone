import { Scene } from 'phaser';
import { initKeys, gameControls } from '../utils/game-controls';

class GameScene extends Scene {
    constructor(){
        super({key: 'GameScene'});
        this.gameState = {};
    }

    preload() {
        this.load.image('bg', 'assets/images/paddleboardbg.png');
        this.load.image('paddle', 'assets/images/paddle.png');
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setScale(3.5,3);
        this.gameState.player1 = this.add.sprite(60, this.cameras.main.centerY, 'paddle').setScale(3);
        this.gameState.player2 = this.add.sprite(this.cameras.main.displayWidth - 60, this.cameras.main.centerY, 'paddle').setScale(3);
        
        initKeys(this)
        
    }

    update() {
        gameControls(this); 
    }
}

export default GameScene;