import {Route, Switch} from 'react-router-dom';
import SpaceInvaders from './pages/SpaceInvaders/SpaceInvaders';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/space-invaders' component={SpaceInvaders} />
      </Switch>
    </div>
  );
}

export default App;
