export function addStaticWalls(scene, walls) {
    const offset = 2;
    scene.gameState.walls = scene.physics.add.staticGroup();
    scene.gameState.wallArray = [
        scene.gameState.walls.create(scene.cameras.main.centerX, offset, walls[0]).setScale(2, 0.01).refreshBody(),
        scene.gameState.walls.create(scene.cameras.main.centerX, scene.cameras.main.displayHeight-offset, walls[0]).setScale(2, 0.01).refreshBody(),
        scene.gameState.walls.create(offset, scene.cameras.main.centerY, walls[1]).setScale(0.01, 2).refreshBody(),
        scene.gameState.walls.create(scene.cameras.main.displayWidth-offset, scene.cameras.main.centerY, walls[1]).setScale(0.01, 2).refreshBody()
    ]
}

export function addBall(scene) {
    scene.gameState.ball = scene.physics.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'ball').setScale(6,2/3);
    scene.gameState.ball.setVisible(false);
    scene.gameState.ball.setBounce(1,1);
    scene.gameState.ball.firstLaunch = true;
    
}

export function addColliders(scene) {
    scene.gameState.wallArray.forEach(wall => {
        scene.physics.add.collider(wall, scene.gameState.ball)
    })     
}

export function addLogo(scene, logo) {
    scene.gameState.logoScale = 0.01;
    scene.gameState.logo = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, logo).setScale(scene.gameState.logoScale)
}

export function updateDisplay(scene, gameTime) {
    if(scene.gameState.ball.firstLaunch) {
        const velocityY = -600 + Math.random()*1200;
        const velocityX = -600 + Math.random()*1200;
        scene.gameState.ball.setVelocity(velocityX,velocityY);
        scene.gameState.ball.setVisible(true);
        scene.gameState.ball.firstLaunch = false;
        pressToPlay(scene);
    }
    scene.gameState.updatePressToPlay(gameTime);

}

export function pressToPlay(scene) {
    scene.gameState.pressToPlay = scene.add.text(scene.cameras.main.centerX - 80, 3*scene.cameras.main.centerY/2, 'Press here to play').setOrigin(0, 0);
    scene.input.on('pointerup', ()=> {
        scene.scene.start('GameScene');
    })
    scene.gameState.updatePressToPlay = initPresstoPlay(scene);
}

function initPresstoPlay(scene) {
    let startTime = 0;
    let pad = -1;
    let maxPad = 3;
    let changeTime = 500;  // every 0.5 sec
    let baseMessage = 'Press here to play';
    return function(gameTime) {
        if(gameTime - startTime < changeTime) {
            return;
        }

        if (pad === maxPad) {
            pad = -1;
        }
        let displayMessage = baseMessage;
        for (let i = 0; i <= pad; i++) {
            displayMessage += '.';
        }

        scene.gameState.pressToPlay.setText(displayMessage);
        pad += 1;
        startTime = gameTime;
    }
}