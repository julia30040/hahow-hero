import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import HeroPage from './container/HeroPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/heroes" />
          <Route path="/heroes">
            <HeroPage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
