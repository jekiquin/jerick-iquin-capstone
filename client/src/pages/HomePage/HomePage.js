import { Component, createRef } from 'react';
import { Redirect } from 'react-router-dom';
import { gameFetcher } from '../../utils/axiossetup';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import ArcadeFrame from '../../components/ArcadeFrame/ArcadeFrame';
import './HomePage.scss';
import leaderButton from '../../assets/images/leaderboard.png';


class HomePage extends Component{
    state = {
        redirect: false,
        games: null,
        gameIndex: null,
        highScores: null,
        user: ''
    }

    userInput = createRef()

    componentDidMount() {
        let games, gameIndex = 0;
        gameFetcher.get('/get-logos')
            .then(res => {
                games = Object.entries(res.data);
                return gameFetcher.get(`/get-highscores`);
            }).then(res => {
                this.setState({
                    games,
                    gameIndex,
                    highScores: res.data,
                    user: sessionStorage.getItem('user') || 'Gamer'
                })
            }).catch(error => {
                console.log(error)
            })
    }

    handleNextImage = () => {
        const { games, gameIndex } = this.state;
        if(gameIndex + 1 === games.length) {
            return
        }
        this.setState({
            gameIndex: gameIndex + 1
        })
    }

    handlePreviousImage = () => {
        const { gameIndex } = this.state;
        if(gameIndex === 0) {
            return
        }
        this.setState({
            gameIndex: gameIndex - 1
        })
    }

    handleStartGame = () => {
        this.setState({
            redirect: true
        })
    }

    handleChange = () => {
        const input = this.userInput.current.value
        sessionStorage.setItem('user', input.trim())
        this.setState({
            user: input.trim()
        })
    }

    render() {
        const { games, gameIndex, redirect, highScores, user } = this.state;
        const gameHighScore = games && highScores[games[gameIndex][0]];
        return redirect 
        ? <Redirect to={{
                pathname:`/games/${games[gameIndex][0]}`,
                state: {user, gameHighScore}
            }} />
        : (
                <main className='arcade'>
                    <label htmlFor='invisiblecheck'><img className='arcade__leader' src={leaderButton} alt='leader button' /></label>
                    <input className='arcade__invisiblecheck' type='checkbox' name='invisiblecheck' id='invisiblecheck' />
                    <LeaderBoard 
                        gameHighScore={gameHighScore} 
                        user={user} 
                        userInput={this.userInput} 
                        handleChange={this.handleChange} 
                    />
                    <ArcadeFrame 
                        games={games} 
                        gameIndex={gameIndex}
                        handleStartGame={this.handleStartGame}
                        handlePreviousImage={this.handlePreviousImage} 
                        handleNextImage={this.handleNextImage}
                    />
     
                </main>
        )
    }

}

export default HomePage;