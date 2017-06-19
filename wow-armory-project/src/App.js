import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './navbar/Navbar.js';
import Character from './characters/Character.js';
import Guild from './guilds/Guild.js';
import Home from './home/Home.js';
import axios from 'axios';
import api from 'config.json';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

console.log(api);

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
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
