import { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { gameFetcher, LOCAL_HOST } from '../../utils/axiossetup';
import './HomePage.scss';
import arcade from '../../assets/images/arcade.png';
import loading from '../../assets/images/loading.png'


class HomePage extends Component{
    state = {
        redirect: false,
        games: null
    }

    componentDidMount() {
        gameFetcher.get('/get-logos')
            .then(res => {
                this.setState({
                    games: res.data
                })
            })
    }

    showImages = () => {
        const { games } = this.state;
        return Object.values(games).map(game => (
            <img className='arcade__img' src={`${LOCAL_HOST}/assets/images/${game}`} alt={game}/>
        ))
    }

    render() {
        const { games } = this.state;

        return(
            <main>
                <div className='arcade'>
                    <div className='arcade__imgs'>
                        {!games && <img className='arcade__img' src={loading} alt='page loading' />}
                        {games && this.showImages()}
                    </div>
                    <img className='arcade__frame' src={arcade} alt='arcade' />
                    <div className='arcade__buttons'>

                    </div>
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