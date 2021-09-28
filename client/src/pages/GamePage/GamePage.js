import { Component, createRef } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import { Link } from 'react-router-dom';
import backButton from '../../assets/images/backbutton.png';
import './GamePage.scss'

class GamePage extends Component {
    state = {
        gameInstance: null,
        topScore: 0
    }

    gameRef = createRef();

    componentDidMount() {
        console.log(this.props.history);
        const { gameId } = this.props.match.params;
        import(`../../phaser/${gameId}/phaser-game.js`)
            .then(response => {
                this.setState({gameInstance: response.gameConfig});
                const topScore = this.props.location.state.highScores[0].score;
                console.log(topScore);
                setTimeout(() => {
                    const reactProps = Object.keys(this.gameRef.current).find(key => key.includes('reactProps'));
                    const game = this.gameRef.current[reactProps].game;
                    game.instance.scene.keys.GameScene.gameState.highScore = topScore;
            
                }, 500)
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
            <div className='gamepage'>
                <Link to='/' >
                    <img className='gamepage__back-button' src={backButton} alt='back button' />
                </Link>
                <div id="phaser-game">
                    {gameInstance && <IonPhaser ref={this.gameRef} game={gameInstance}/>}
                </div>
            </div>
        )
    }
}

export default GamePage;
