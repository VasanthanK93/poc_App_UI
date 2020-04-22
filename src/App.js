import React, { Component }from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Team from './components/Team/Team';
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/Users/Users';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './helpers/history';
import { PrivateRoute } from './components/Route/PrivateRoute'

class App extends Component {
  render(){
    return (
      <Provider store={store}>
          <Router history={history}>
             <div className="App">
                <Navbar/>
                <Switch>
                    <PrivateRoute exact path="/" component={Team} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/users" component={Users} />
                    <Redirect from="*" to="/" />
                </Switch> 
            </div>
          </Router>  
      </Provider>
    );
  }
}

export default App;
