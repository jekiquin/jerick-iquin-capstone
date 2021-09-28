import arcade from '../../assets/images/arcade.png';
import loading from '../../assets/images/loading.png';
import { LOCAL_HOST }  from '../../utils/axiossetup';
import './ArcadeFrame.scss';

function ArcadeFrame({games, gameIndex, handlePreviousImage, handleNextImage, handleStartGame}) {
    const showImage = (idx) => {
        return (
            <img 
                className='arcade__img' 
                id={games[idx][0]} 
                src={`${LOCAL_HOST}/assets/images/${games[idx][1]}`} 
                alt={games[idx][0]}
            />
        )
    }

    return(
        <>
            <div className='arcade__imgs'>
                {!games && <img className='arcade__img' src={loading} alt='page loading' />}
                {games && showImage(gameIndex)}
            </div>
            <div className='arcade__buttons'>
                <div className='arcade__button arcade__button--start' onClick={handleStartGame}></div>
                <div className='arcade__button' onClick={handlePreviousImage}></div>
                <div className='arcade__button' onClick={handleNextImage}></div>
            </div>
            <img className='arcade__frame' src={arcade} alt='arcade' />
        </>
    )
}

export default ArcadeFrame;