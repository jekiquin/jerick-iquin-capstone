function readGameScore(gameNode) {
    const game = extractGame(gameNode);
    return game.instance.scene.keys.GameScene.gameState.highScore;
}

function writeGameScore(gameNode, topScore) {
    const game = extractGame(gameNode);
    game.instance.scene.keys.GameScene.gameState.highScore = topScore;
}

function extractGame(gameNode) {
    const reactProps = Object.keys(gameNode).find(key => key.includes('reactProps'));
    return gameNode[reactProps].game;
}

module.exports = {
    readGameScore,
    writeGameScore
}