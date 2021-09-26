import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './HomePage.scss';
import arcade from '../../assets/images/arcade.png';


class HomePage extends Component{
    state = {
        redirect: false
    }
    render() {
        return(
            <main>
                <div className='arcade'>
                    <img className='arcade__frame' src={arcade} alt='arcade' />
                    <div className='arcade__imgs'>
                        
                    </div>
                </div>
                {/* <ul className='game-library'>
                    <li className='game'><Link to='/space-invaders'>Space Invaders</Link></li>
                    <li className='game'><Link to='/pong'>Pong</Link></li>
                    <li className='game'><Link to='/breakout'>Breakout</Link></li>
                </ul> */}
            </main>
        )
    }

}

export default HomePage;