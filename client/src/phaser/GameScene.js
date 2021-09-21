import { Scene } from 'phaser';

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'});
        this.gameState = {}
    }


    preload() {
        this.load.image('ship', 'assets/sprites/ship.png');
    }

    create() {
        this.gameState.player = this.physics.add.sprite(100,200,'ship').setScale(.5);
    }
}

export default GameScene;