const MAX_VELOCITY = 600;
const MAXLEVEL = 5;
const TEXT_STYLE = {fontFamily: 'Game', fontSize: '12px'};

export function gameInit(scene) {
    scene.gameState.ballActive = false;
    scene.gameState.score = 0;
    scene.gameState.ballSpeed = 200;
    scene.gameState.level = 1;
    scene.gameState.active = true;
}

export function addPlayer(scene, player) {
    scene.gameState.player = scene.physics.add.sprite(scene.cameras.main.centerX, scene.cameras.main.displayHeight - 50, player);
    scene.gameState.player.setCollideWorldBounds(true);
    scene.gameState.player.body.immovable = true;
    scene.gameState.player.body.setMaxVelocityX(MAX_VELOCITY);
}

export function addBall(scene, ball) {
    scene.gameState.ball = scene.physics.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, ball).setScale(2);
    scene.gameState.ball.setCollideWorldBounds(true);
    scene.gameState.ball.setBounce(1,1);
}

export function addPlatform(scene, platform) {
    scene.gameState.platforms = scene.physics.add.staticGroup();
    scene.gameState.platforms.create(scene.cameras.main.centerX, scene.cameras.main.displayHeight - 5, platform).setScale(1, 0.01).refreshBody();
}

export function addColliders(scene) {
    scene.physics.add.collider(scene.gameState.ball, scene.gameState.player, () => {
        const velocityX = scene.gameState.ball.body.velocity.x + scene.gameState.player.body.velocity.x * (scene.gameState.ballSpeed / MAX_VELOCITY);
        scene.gameState.ball.setVelocityX(velocityX);
    });

    scene.physics.add.collider(scene.gameState.ball, scene.gameState.bricks, (_, brick) => {
        brick.destroy();
        scene.gameState.score += 1;
        updateHighScore(scene);
        updateLevel(scene);
     });

     scene.physics.add.collider(scene.gameState.ball, scene.gameState.platforms, () => {
        scene.gameState.active = false;
        scene.gameState.ball.destroy();
        displayGameOver(scene);
     })
}

export function addBricks(scene) {
    scene.gameState.bricks?.destroy();
    scene.gameState.bricks = scene.physics.add.group();
    genBrickGroup(scene.gameState.bricks)

}

export function genBrickGroup(brickGroup) {
    for(let yBricks=1; yBricks<8; yBricks++) {
        for (let xBricks=1; xBricks<16; xBricks++) {
            brickGroup.create(34*xBricks, 50+17*yBricks, `brick${yBricks}`).setImmovable(true);
        }
    }
}

export function initTextDisplay(scene) {
    scene.gameState.scoreDisplay = scene.add.text(20, 10, `Score: ${scene.gameState.score}`, TEXT_STYLE);
    scene.gameState.highScoreDisplay = scene.add.text(scene.cameras.main.displayWidth - 20, 10, `High Score: ${scene.gameState.highScore}`, TEXT_STYLE).setOrigin(1,0);
    scene.gameState.levelDisplay = scene.add.text(scene.cameras.main.centerX, 10, `${scene.gameState.level}`, TEXT_STYLE);

    
}

export function updateScoreDisplay(scene) {
    scene.gameState.scoreDisplay.setText(`Score: ${scene.gameState.score}`);
    scene.gameState.highScoreDisplay.setText(`High Score: ${scene.gameState.highScore}`);
}

function displayGameOver(scene) {
    scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY, 'Game Over!\n\nPlay Again?', {...TEXT_STYLE, fontSize: '24px', fill:'#ff0000'}).setOrigin(0.5);

    scene.gameState.yes = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY + 100, 'YES', {...TEXT_STYLE, fontSize: '24px', fill:'#ff0000'}).setOrigin(0.5).setInteractive();
    scene.gameState.no = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY + 150, 'NO', {...TEXT_STYLE, fontSize: '24px', fill:'#ff0000'}).setOrigin(0.5).setInteractive();

    interactiveButtons(scene, [
        scene.gameState.yes,
        scene.gameState.no
    ])
}

function interactiveButtons(scene, buttons) {
    buttons.forEach(button => {
        button.on('pointerover', () => {
            button.setScale(1.2);
        });
        button.on('pointerout', () => {
            button.setScale(1);
        });
        button.on('pointerup', () => {
            if (button._text.toUpperCase() === 'YES') {
                scene.scene.restart();
            } else {
                scene.scene.start('HomeScene');
            }
        })
    })
}

function updateHighScore(scene){
    scene.gameState.highScore = scene.gameState.highScore >= scene.gameState.score ? scene.gameState.highScore : scene.gameState.score;
}

function updateLevel(scene) {
    if (scene.gameState.score % 10 === 0 && scene.gameState.level !== MAXLEVEL) {
        scene.gameState.level += 1;
        scene.gameState.ballSpeed += 20*(scene.gameState.level - 1); 
        scene.gameState.ball.setVelocityY(scene.gameState.ballSpeed);
        scene.gameState.levelDisplay.setText(scene.gameState.level)
    }
}
