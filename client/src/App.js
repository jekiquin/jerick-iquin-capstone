import {Route, Switch} from 'react-router-dom';
import GamePage from './pages/GamePage/GamePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/game' component={GamePage} />
      </Switch>
    </div>
  );
}

export default App;
