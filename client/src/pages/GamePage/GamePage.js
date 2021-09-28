import { Component, createRef } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import { Link } from 'react-router-dom';
import { gameFetcher } from '../../utils/axiossetup';
import { readGameScore, writeGameScore } from '../../utils/read-game';
import backButton from '../../assets/images/backbutton.png';
import './GamePage.scss'

class GamePage extends Component {
    state = {
        gameInstance: null,
        topScore: 0
    }

    gameRef = createRef();

    componentDidMount() {
        const { gameId } = this.props.match.params;
        import(`../../phaser/${gameId}/phaser-game.js`)
            .then(response => {
                this.setState({gameInstance: response.gameConfig});
                const {gameHighScore} = this.props.location.state
                const topScore = gameHighScore ? gameHighScore[0].score : 0;
                setTimeout(() => {
                    // const reactProps = Object.keys(this.gameRef.current).find(key => key.includes('reactProps'));
                    // const game = this.gameRef.current[reactProps].game;
                    // game.instance.scene.keys.GameScene.gameState.highScore = topScore;
                    writeGameScore(this.gameRef.current, topScore);
            
                }, 500)
            });
    }

    componentWillUnmount() {
        const { gameId } = this.props.match.params;
        const {user} = this.props.location.state;
        const topScore = readGameScore(this.gameRef.current)
        // axios post here maybe?
        gameFetcher.post('/get-highscores', {
            game: gameId,
            name: user,
            score: topScore
        })
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
