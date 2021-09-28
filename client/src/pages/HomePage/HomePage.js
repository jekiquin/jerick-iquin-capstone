import { Component, createRef } from 'react';
import { Redirect } from 'react-router-dom';

import { gameFetcher, LOCAL_HOST } from '../../utils/axiossetup';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import './HomePage.scss';
import arcade from '../../assets/images/arcade.png';
import loading from '../../assets/images/loading.png';
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

    showImage = (idx) => {
        const { games } = this.state;
        return (
            <img 
                className='arcade__img' 
                id={games[idx][0]} 
                src={`${LOCAL_HOST}/assets/images/${games[idx][1]}`} 
                alt={games[idx][0]}
            />
        )
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
            <main>
                <div className='arcade'>
                    <label htmlFor='invisiblecheck'><img className='arcade__leader' src={leaderButton} alt='leader button' /></label>
                    <input className='arcade__invisiblecheck' type='checkbox' name='invisiblecheck' id='invisiblecheck' />
                    <LeaderBoard gameHighScore={gameHighScore} user={user} userInput={this.userInput} handleChange={this.handleChange} />
                    <div className='arcade__imgs'>
                        {!games && <img className='arcade__img' src={loading} alt='page loading' />}
                        {games && this.showImage(gameIndex)}
                    </div>
                    <div className='arcade__buttons'>
                        <div className='arcade__button arcade__button--start' onClick={this.handleStartGame}></div>
                        <div className='arcade__button' onClick={this.handlePreviousImage}></div>
                        <div className='arcade__button' onClick={this.handleNextImage}></div>
                    </div>
                    <img className='arcade__frame' src={arcade} alt='arcade' />
     
                </div>
            </main>
        )
    }

}

export default HomePage;