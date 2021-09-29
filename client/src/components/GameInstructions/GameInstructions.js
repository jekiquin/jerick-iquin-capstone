import backButton from '../../assets/images/backbutton.png';
import uniqid from 'uniqid';
import './GameInstructions.scss';


function GameInstructions({instructions}) {
    console.log(instructions);
    const displayInstructions = () => 
        instructions.split('\n').map(instruction => 
            <p key={uniqid()} className='instructions__ctx'>{instruction}</p>
        )
    return(
        <div className='instructions'>
            <label htmlFor="invisiblecheck">
                <img className='instructions__close' src={backButton} alt='close button' />
            </label>
            <h2 className='instructions__header'>Instructions:</h2>
            {displayInstructions()}
        </div>
    )
}

export default GameInstructions;