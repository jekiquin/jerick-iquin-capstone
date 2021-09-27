import Phaser from 'phaser';

export function addPlatform(scene, platform){
    scene.gameState.platforms = scene.physics.add.staticGroup();
    scene.gameState.platforms.create(540, 500, platform).setScale(2, 0.01).refreshBody();
}

export function addJojo(scene, player) {
    scene.gameState.player = scene.physics.add.sprite(255, 500, 'player').setOrigin(0,1);
    scene.gameState.player.setCollideWorldBounds(true);
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.platforms, scene.gameState.player);
}

export function generateAnimations(scene) {
    scene.anims.create({
        key: 'stand', 
        frames: scene.anims.generateFrameNames(
            'player', {start: 17, end: 21}), 
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'run', 
        frames: scene.anims.generateFrameNames(
            'player', {start: 6, end: 11}), 
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'jump', 
        frames: scene.anims.generateFrameNames(
            'player', {start: 12, end: 17}), 
        frameRate: 6,
        repeat: 0
    })

    scene.anims.create({
        key: 'punch', 
        frames: scene.anims.generateFrameNames(
            'player', {start: 0, end: 5}), 
        frameRate: 10,
        repeat: 0
    })
}

export function gameInit(scene) {
    scene.gameState.cursors = scene.input.keyboard.createCursorKeys();
    scene.gameState.player.anims.play('stand', true);
}