import { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { gameFetcher, LOCAL_HOST } from '../../utils/axiossetup';
import './HomePage.scss';
import arcade from '../../assets/images/arcade.png';
import loading from '../../assets/images/loading.png'


class HomePage extends Component{
    state = {
        redirect: false,
        games: null,
        gameIndex: null,
        highScores: null
    }

    componentDidMount() {
        let games, gameIndex = 0;
        gameFetcher.get('/get-logos')
            .then(res => {
                games = Object.entries(res.data);
                return gameFetcher.get(`/get-highscores/${games[gameIndex][0]}`);
            }).then(res => {
                const highScores = res.data || []
                this.setState({
                    games,
                    gameIndex,
                    highScores
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

    render() {
        const { games, gameIndex, redirect, highScores } = this.state;

        return redirect 
        ? <Redirect to={{
                pathname:`/games/${games[gameIndex][0]}`,
                state: {highScores}
            }} />
        : (
            <main>
                <div className='arcade'>
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