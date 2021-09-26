import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import SpaceInvaders from './pages/SpaceInvaders/SpaceInvaders';
import PaddleBall from './pages/PaddleBall/PaddleBall';
import Breakout from './pages/Breakout/Breakout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/games' exact component={HomePage} />
        <Route path='/games/:gameId' component={GamePage} />  
        {/* <Redirect from='/' to='/games' /> */}
        {/* <Route path='/space-invaders' component={SpaceInvaders} />
        <Route path='/pong' component={PaddleBall} />
        <Route path='/breakout' component={Breakout} /> */}
      </Switch>
    </div>
  );
}

export default App;
