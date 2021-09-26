import { Component, createRef } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import { gameConfig } from '../../phaser/space-invaders/phaser-game';


class SpaceInvaders extends Component {
    state = {
        gameInstance: gameConfig
    }

    gameRef = createRef();

    render() {
        const { gameInstance } = this.state;
        return(
            <div id="phaser-game">
                <IonPhaser ref={this.gameRef} game={gameInstance}/>
            </div>
        )
    }
}

export default SpaceInvaders;