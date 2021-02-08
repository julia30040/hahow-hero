import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import HeroPage from './container/HeroPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/heroes">
            <HeroPage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
