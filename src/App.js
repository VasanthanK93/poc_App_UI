import React, { Component }from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import TeamTable from './components/TeamTable/TeamTable';

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">POC FORUM</h1>
          </header>
          <div className = "container">
            <Navbar/>
            <TeamTable/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
