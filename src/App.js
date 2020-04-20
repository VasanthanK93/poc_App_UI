import React, { Component }from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import TeamTable from './components/TeamTable/TeamTable';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">POC FORUM</h1>
          </header>
          <div className = "container">
          <Router>
            <Switch>
              <Route path="/" exact component={TeamTable} />
              <Route path="/login" exact component={Login} />
              <Route path="/poclist" component={TeamTable} />
            </Switch>
          </Router>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
