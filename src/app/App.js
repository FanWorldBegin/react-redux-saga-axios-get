import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from '../store.js'
import ReduxActions from '../ReduxActions/index.js'
import { Provider } from "react-redux";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-redux">
            <ReduxActions showDefaultText={true}/>
        </div>
        </div>
      </Provider>
    );
  }
}

export default App;
