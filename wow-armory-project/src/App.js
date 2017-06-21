import React, { Component } from 'react';
import './App.css';
import Navbar from './navbar/Navbar.js';
import Character from './characters/Character.js';
import Guild from './guilds/Guild.js';
import RaidProgress from './raidprogress/RaidProgress.js';
import Home from './home/Home.js';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="Body">
        <Navbar />
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/characters" component={Character}/>
          <Route path="/guilds" component={Guild} />
          <Route path="/raidprogress" component={RaidProgress} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
