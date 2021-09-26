import { Component, createRef } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import { gameConfig } from '../../phaser/breakout/phaser-game';


class Breakout extends Component {
    state = {
        gameInstance: gameConfig,
    }

    gameRef = createRef();

    componentDidMount() {
        setTimeout(() => {
            const reactProps = Object.keys(this.gameRef.current).find(key => key.includes('reactProps'));
            const game = this.gameRef.current[reactProps].game;
            // console.log(game.instance.scene.keys.GameScene.gameState)
            // axios post here maybe?
            // game.instance.scene.keys.GameScene.gameState.highScore = 300;
        }, 100)

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
                <IonPhaser ref={this.gameRef} game={gameInstance}/>
            </div>
        )
    }
}

export default Breakout;