import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import uniqid from 'uniqid';
import { gameFetcher, LOCAL_HOST } from '../../utils/axiossetup';
import './HomePage.scss';
import arcade from '../../assets/images/arcade.png';
import loading from '../../assets/images/loading.png'


class HomePage extends Component{
    state = {
        redirect: false,
        games: null,
        gameIndex: null,
        highScores: null,
        user: 'Gamer'
    }

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
                    highScores: res.data
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

    handleChange = e => {
        this.setState({
            user: e.target.value.trim()
        })
    }

    showHighScores = (highScores) => (
        <ol className='arcade__scores'>
            {highScores?.map(data => (
                <li key={uniqid()} className='arcade__score'>
                    {data.name.padEnd(15,'-').toUpperCase()}{data.score}
                </li>
            ))}
        </ol>
    )

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
                    <div className='arcade__data'>
                        <label htmlFor='gamer'>Enter player name:</label>
                        <input type='text' id='gamer' name='gamer' onChange={this.handleChange} value={user} minLength='1' maxLength='6'/>
                        { gameHighScore && 
                            <>
                                <h2>High Scores:</h2>
                                {this.showHighScores(gameHighScore)}
                            </>
                        }

                    </div>
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