import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route path='/:gameId' component={GamePage} />
        <Redirect from='/' to='/home' />
      </Switch>
    </div>
  );
}

export default App;
