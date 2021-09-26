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
                    games: res.data,
                    gameIndex: 0
                })
            })
    }

    showImage = (idx) => {
        const { games } = this.state;
        const gamesList = Object.entries(games);
        return (
            <img 
                className='arcade__img' 
                id={gamesList[idx][0]} 
                src={`${LOCAL_HOST}/assets/images/${gamesList[idx][1]}`} 
                alt={gamesList[idx][0]}
            />
        )
    }

    render() {
        const { games, gameIndex } = this.state;

        return(
            <main>
                <div className='arcade'>
                    <div className='arcade__imgs'>
                        {!games && <img className='arcade__img' src={loading} alt='page loading' />}
                        {games && this.showImage(gameIndex)}
                    </div>
                    <div className='arcade__buttons'>
                        <div className='arcade__button arcade__button--start'></div>
                        <div className='arcade__button'></div>
                        <div className='arcade__button'></div>
                    </div>
                    <img className='arcade__frame' src={arcade} alt='arcade' />
     
                </div>
                <ul className='game-library'>
                    <li className='game'><Link to='/games/spaceinvaders'>Space Invaders</Link></li>
                    <li className='game'><Link to='/games/pong'>Pong</Link></li>
                    <li className='game'><Link to='/games/breakout'>Breakout</Link></li>
                </ul>
            </main>
        )
    }

}

export default HomePage;