import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SpaceInvaders from './pages/SpaceInvaders/SpaceInvaders';
import PaddleBall from './pages/PaddleBall/PaddleBall';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={HomePage} />  
        <Route path='/space-invaders' component={SpaceInvaders} />
        <Route path='/paddle-ball' component={PaddleBall} />
      </Switch>
    </div>
  );
}

export default App;
