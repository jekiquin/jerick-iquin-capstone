import { Scene } from 'phaser';
// import GameScene from './GameScene';

class HomeScene extends Scene {
    constructor() {
        super({key: 'HomeScene'})
    }

    preload() {
        this.load.image('bg', 'assets/images/spaceinvadersbg.jpg');
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setOrigin(0.5, 0.5).setScale(1, 1.2);
        this.input.on('pointerup', () => {
            this.scene.start('GameScene')
        })
    }
}

export default HomeScene;