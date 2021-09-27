import { Scene } from 'phaser';
import {LOCAL_HOST} from '../../../utils/axiossetup';

class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'});
        this.gameState = {}
    }

    preload() {
        this.load.image('bg', LOCAL_HOST + '/assets/images/jojobg.png');
        this.load.image('platform', LOCAL_HOST + '/assets/images/platform.png')
        this.load.spritesheet('player', LOCAL_HOST + '/assets/sprites/jojo.png', {frameWidth: 142, frameHeight: 144});
    }

    create() {
        this.gameState.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(0, 0, 'bg').setOrigin(0.25,0).setScale(1.7);
        this.gameState.platforms = this.physics.add.staticGroup();
        this.gameState.platforms.create(540, 500, 'platform').setScale(2, 0.01).refreshBody();
        this.gameState.player = this.physics.add.sprite(255, 500, 'player').setOrigin(0,1);
        this.physics.add.collider(this.gameState.platforms, this.gameState.player);

        this.anims.create({
            key: 'stand', 
            frames: this.anims.generateFrameNames(
                'player', {start: 17, end: 21}), 
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'run', 
            frames: this.anims.generateFrameNames(
                'player', {start: 6, end: 11}), 
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'jump', 
            frames: this.anims.generateFrameNames(
                'player', {start: 12, end: 17}), 
            frameRate: 6,
            repeat: 0
        })

        this.anims.create({
            key: 'punch', 
            frames: this.anims.generateFrameNames(
                'player', {start: 0, end: 5}), 
            frameRate: 10,
            repeat: 0
        })

        this.gameState.player.anims.play('stand', true);
        console.log(this.gameState.player.anims.currentAnim);
    }

    update() {
        if (!this.gameState.player.anims.isPlaying) {
            this.gameState.player.setVelocityX(0);
        }

        if (this.gameState.cursors.right.isDown) {
            console.log('run');
            this.gameState.player.flipX = true;
            this.gameState.player.body.touching.down && this.gameState.player.anims.play('run', true);
            this.gameState.player.setVelocityX(250);
        } else if (this.gameState.cursors.left.isDown) {
            this.gameState.player.flipX = false;
            this.gameState.player.body.touching.down && this.gameState.player.anims.play('run', true);
            this.gameState.player.setVelocityX(-250);
        } else if(this.gameState.player.anims.currentAnim.key === 'run') {
            this.gameState.player.anims.play('run', false);
            this.gameState.player.body.touching.down && this.gameState.player.anims.play('stand', true);
            this.gameState.player.setVelocityX(0);
            // console.log('nothing')
        }

        if(this.gameState.cursors.up.isDown && this.gameState.player.body.touching.down) {
            this.gameState.player.anims.play('jump', true);
            this.gameState.player.setVelocityY(-470);
        }

        if(this.gameState.cursors.space.isDown) {
            this.gameState.player.setVelocityX(0);
            this.gameState.player.anims.play('punch', true);
        }

        
    }
}

export default GameScene;