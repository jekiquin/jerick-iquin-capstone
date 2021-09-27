import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import HomeScene from './scenes/HomeScene';


export const gameConfig = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        parent: 'phaser-game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 540,
        height: 720
    },
    backgroundColor: '000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            enableBody: true,
            debug: false
        }
    },
    scene: [HomeScene, GameScene]
}
