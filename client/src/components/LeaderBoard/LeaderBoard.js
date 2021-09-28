import backButton from '../../assets/images/backbutton.png';
import uniqid from 'uniqid';
import './LeaderBoard.scss';

function LeaderBoard({ gameHighScore, user, userInput, handleChange }) {
// class LeaderBoard extends Component {

    const showHighScores = (highScores) => (
        <ol className='arcade__scores'>
            {highScores?.slice(0, 10).map(data => (
                <li key={uniqid()} className='arcade__score'>
                    {data.name.padEnd(15,'-').toUpperCase()}{`${data.score}`.padStart(3,'0')}
                </li>
            ))}
        </ol>
    )

    return(
        <div className='arcade__data'>
            <label htmlFor='invisiblecheck'><img className='arcade__close' src={backButton} alt='close button' /></label>
            <label htmlFor='gamer'>Enter player name:</label>
            <input ref={userInput} className='arcade__user' type='text' id='gamer' name='gamer' onChange={handleChange} value={user} minLength='1' maxLength='10'/>
            { gameHighScore && 
                <>
                    <h2>High Scores:</h2>
                    {showHighScores(gameHighScore)}
                </>
            }

        </div>
    )

    
}

export default LeaderBoard;