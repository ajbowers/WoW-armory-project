import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './navbar/Navbar.js';
class App extends Component {
  render() {
    return (
      <div className="Body">
        <Navbar />
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, test test edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;