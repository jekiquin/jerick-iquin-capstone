import Phaser from 'phaser';

export const gameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 540,
        height: 720
    },
    backgroundColor: '000000',
    scene: {}
}
