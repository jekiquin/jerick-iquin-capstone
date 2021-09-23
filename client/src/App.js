import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SpaceInvaders from './pages/SpaceInvaders/SpaceInvaders';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={HomePage} />  
        <Route path='/space-invaders' component={SpaceInvaders} />
      </Switch>
    </div>
  );
}

export default App;
