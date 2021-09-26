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
    }

    componentDidMount() {
        gameFetcher.get('/get-logos')
            .then(res => {
                this.setState({
                    games: Object.entries(res.data),
                    gameIndex: 0
                })
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
        const { game, gameIndex } = this.state;
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
        const { games, gameIndex, redirect } = this.state;

        return redirect 
        ? <Redirect to={`/games/${games[gameIndex][0]}`} />
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