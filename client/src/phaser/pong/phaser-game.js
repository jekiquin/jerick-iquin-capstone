import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import HomeScene from './scenes/HomeScene';


export const gameConfig = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        parent: 'phaser-game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 540
    },
    backgroundColor: '000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            enableBody: true,
            debug: false
        }
    },
    scene: [HomeScene, GameScene]
}

export const instructions = 'Player 1 Movements: W and S\nPlayer 2 Movements: Up and Down Arrow';