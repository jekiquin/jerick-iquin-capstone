import { Component, createRef } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import { Link } from 'react-router-dom';
import { gameFetcher } from '../../utils/axiossetup';
import { readGameScore, writeGameScore } from '../../utils/read-game';
import backButton from '../../assets/images/backbutton.png';
import homeButton from '../../assets/images/backbutton.png';
import infoButton from '../../assets/images/info.png';
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
                this.setState({topScore});
                setTimeout(() => {
                    // phaser needs time to generate the gamescores.   
                    writeGameScore(this.gameRef.current, topScore);
                    
                }, 500)
            });
    }

    componentWillUnmount() {
        const { gameId } = this.props.match.params;
        const {user} = this.props.location.state;
        const {topScore} = this.state;
        const highScore = readGameScore(this.gameRef.current);
        console.log(highScore, topScore);
        // axios post here maybe?
        if(highScore && highScore !== topScore) {
            // if there's no topscore or if it's zero, just move on.
            gameFetcher.post('/get-highscores', {
                game: gameId,
                name: user,
                score: highScore
            })
            .then(() => {
                console.log('Post success!')
            })
        }

        this.gameRef.current.destroy();
    }

    render() {
        const { gameInstance } = this.state;
        return(
            <div className='gamepage'>
                <div id="phaser-game">
                    {gameInstance && <IonPhaser ref={this.gameRef} game={gameInstance}/>}
                </div>
                <div className='gamepage__buttons'>
                    <Link to='/' >
                        <img className='gamepage__button' src={homeButton} alt='home button' />
                    </Link>
                    <label htmlFor="invisiblecheck">
                        <img className='gamepage__button' src={infoButton} alt='back button' />
                    </label>
                    <input className='gamepage__invisiblecheck' type='checkbox' name='invisblecheck' id='invisiblecheck' />
                </div>

            </div>
        )
    }
}

export default GamePage;
