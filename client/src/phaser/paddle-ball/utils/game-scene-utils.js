const TEXT_STYLE = {fontFamily: 'Game', fontSize: '24px'};
const MAXSCORE = 7;

export function addPaddles(scene, paddle) {
    const offset = 60;
    scene.gameState.player1 = scene.physics.add.sprite(offset, scene.cameras.main.centerY, paddle).setScale(3);
    scene.gameState.player2 = scene.physics.add.sprite(scene.cameras.main.displayWidth - offset, scene.cameras.main.centerY, paddle).setScale(3);

    scene.gameState.player1.body.collideWorldBounds = true;
    scene.gameState.player2.body.collideWorldBounds = true;
    scene.gameState.player1.body.immovable = true;
    scene.gameState.player2.body.immovable = true;
}

export function addBall(scene, ball) {
    scene.gameState.ball = scene.physics.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, ball).setScale(6,2/3);
    scene.gameState.ball.setBounce(1,1);
}

export function addPlatforms(scene, platform) {
    const offsetY = 34;
    scene.gameState.platforms = scene.physics.add.staticGroup();

    scene.gameState.sideWall = [
        scene.gameState.platforms.create(scene.cameras.main.centerX, scene.cameras.main.displayHeight - offsetY, platform).setScale(2, 0.01).refreshBody(),
        scene.gameState.platforms.create(scene.cameras.main.centerX, offsetY, platform).setScale(2, 0.01).refreshBody()
    ]
}

export function initScores(scene) {
    scene.gameState.Score1 = 0;
    scene.gameState.Score2 = 0;

}

export function ballOut(scene) {
    if (scene.gameState.ball.x < 0 || scene.gameState.ball.x > scene.cameras.main.displayWidth) {
        scene.gameState.player1ToServe = !(scene.gameState.ball.x < 0);
        scene.gameState.ballActive = !scene.gameState.ballActive;
        const ball = scene.gameState.ball.texture.key;
        updateScore(scene);
        displayUpdatedScores(scene);
        addBall(scene, ball);
        addBallCollider(scene);
        updateServeMessage(scene);
        
    }
}

export function initTextDisplay(scene) {
    scene.gameState.player1Display = scene.add.text(scene.cameras.main.centerX-70, 50, scoreDisplay(`${scene.gameState.Score1}`), TEXT_STYLE);
    
    scene.gameState.player2Display = scene.add.text(scene.cameras.main.centerX+70, 50, scoreDisplay(`${scene.gameState.Score2}`), TEXT_STYLE).setOrigin(1,0);
    
    scene.gameState.playerServerMessage = scene.add.text(70, 50, 'Player 1 to serve!', {...TEXT_STYLE, fontSize: '12px'});

    scene.gameState.resetButton = scene.add.text(scene.cameras.main.displayWidth-70, 50, 'RESET HERE', {...TEXT_STYLE, fontSize: '12px', fill: '#ff0000'}).setInteractive().setOrigin(1,0);

    buttonInteraction(scene);
}

export function addColliders(scene) {
    scene.gameState.sideWall.forEach(wall => {
        scene.physics.add.collider(wall, scene.gameState.player1);
        scene.physics.add.collider(wall, scene.gameState.player2);
    });

    addBallCollider(scene)
}

function displayUpdatedScores(scene) {
    scene.gameState.player1Display.setText(scoreDisplay(`${scene.gameState.Score1}`));
    scene.gameState.player2Display.setText(scoreDisplay(`${scene.gameState.Score2}`));
}

function updateServeMessage(scene) {
    const playerToServer = scene.gameState.player1ToServe ? 'Player 1' : 'Player 2';
    scene.gameState.playerServerMessage.setText(`${playerToServer} to serve!`);
}

function updateScore(scene) {
    if (scene.gameState.ball.x < 0) {
        scene.gameState.Score2 += 1;
    } else if (scene.gameState.ball.x > scene.cameras.main.displayWidth) {
        scene.gameState.Score1 += 1;
    }

    checkWinner(scene)
}

function checkWinner(scene) {
    const {Score1, Score2} = scene.gameState;
    if (Score1 < MAXSCORE && Score2 < MAXSCORE) {
        return;
    }

    scene.gameState.resetButton.disableInteractive();
    scene.gameState.gameActive = false;
    if (Score1 === MAXSCORE) {
        endGame(scene, 'Player 1');
    }

    if (Score2 === MAXSCORE) {
        endGame(scene, 'Player 2');
    }

}

function endGame(scene, winner) {
    const textStyle = {...TEXT_STYLE, fontSize: '32px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 3}
    scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY/2, `${winner} won!\n\n Play again?`, textStyle).setOrigin(0.5, 0.5);

    scene.gameState.yes = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY + 50, 'Yes', textStyle).setOrigin(0.5, 0.5).setInteractive();

    scene.gameState.no = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY + 120, 'No', textStyle).setOrigin(0.5, 0.5).setInteractive();

    optionsInteractive(scene);
}

function optionsInteractive(scene) {
    hoverButton(scene.gameState.yes);
    scene.gameState.yes.on('pointerup', () => {
        scene.scene.restart();
    });

    hoverButton(scene.gameState.no);
    scene.gameState.no.on('pointerup', () => {
        scene.scene.start('HomeScene');
    });
}

function hoverButton(button) {
    
    button.on('pointerover', () => {
       
        button.setScale(1.2);
    });

    button.on('pointerout', () => {
        button.setScale(1);
    });
}

function scoreDisplay(score) {
    return score.padStart(2, '0');
}

function addBallCollider(scene) {
    scene.gameState.sideWall.forEach(wall => {
        scene.physics.add.collider(wall, scene.gameState.ball);
    })

    scene.physics.add.collider(scene.gameState.ball, scene.gameState.player1, () => {
        const velocityY = scene.gameState.ball.body.velocity.y + scene.gameState.player1.body.velocity.y/2;
        scene.gameState.ball.setVelocityY(velocityY);
    });

    scene.physics.add.collider(scene.gameState.ball, scene.gameState.player2, () => {
        const velocityY = scene.gameState.ball.body.velocity.y + scene.gameState.player2.body.velocity.y/2;
        scene.gameState.ball.setVelocityY(velocityY);
    })
}

function buttonInteraction(scene) {
    scene.gameState.resetButton.on('pointerover', () => {
        scene.gameState.resetButton.setScale(1.2);
    });

    scene.gameState.resetButton.on('pointerout', () => {
        scene.gameState.resetButton.setScale(1);
    })

    scene.gameState.resetButton.on('pointerup', () => {
        scene.scene.restart();
    })
}