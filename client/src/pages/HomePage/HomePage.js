import { Link } from 'react-router-dom';

function HomePage() {
    return(
        <main>
            <ul className='game-library'>
                <li className='game'><Link to='/space-invaders'>Space Invaders</Link></li>
                <li className='game'><Link to='/paddle-ball'>Paddle Ball</Link></li>
                <li className='game'></li>
            </ul>
        </main>
    )
}

export default HomePage;