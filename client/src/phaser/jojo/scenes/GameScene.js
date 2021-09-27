import { Scene } from 'phaser';
import {LOCAL_HOST} from '../../../utils/axiossetup';
import { genControls } from '../utils/game-scene-controls';
import { addColliders, addJojo, addPlatform, gameInit, generateAnimations } from '../utils/game-scene-utils';

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
        this.add.image(0, 0, 'bg').setOrigin(0.25,0).setScale(1.7);
        addPlatform(this, 'platform');
        addJojo(this, 'player');
        addColliders(this);
        generateAnimations(this);
        gameInit(this);
    }

    update() {
        genControls(this);
    }
}

export default GameScene;