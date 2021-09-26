import { Component, createRef } from 'react';
import { IonPhaser } from '@ion-phaser/react';

class GamePage extends Component {
    state = {
        gameInstance: null,
    }

    gameRef = createRef();

    componentDidMount() {
        const { gameId } = this.props.match.params;
        import(`../../phaser/${gameId}/phaser-game.js`)
            .then(response => {
                console.log(response.gameConfig);
                this.setState({gameInstance: response.gameConfig})
                // setTimeout(() => {
                //     const reactProps = Object.keys(this.gameRef.current).find(key => key.includes('reactProps'));
                //     const game = this.gameRef.current[reactProps].game;
                //     // console.log(game.instance.scene.keys.GameScene.gameState)
                //     // axios post here maybe?
                //     // game.instance.scene.keys.GameScene.gameState.highScore = 300;
            
                // }, 500)
            });
    }

    componentWillUnmount() {
        // console.log(this.state.gameData.highScore);
        // axios post here maybe?
        this.gameRef.current.destroy();
    }

    render() {
        const { gameInstance } = this.state;
        return(
            <div id="phaser-game">
                {gameInstance && <IonPhaser ref={this.gameRef} game={gameInstance}/>}
            </div>
        )
    }
}

export default GamePage;
