import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <div className="navbar-dropdown"> 
            <p> Home </p>
        </div>
        <div className="navbar-dropdown"> 
            <p> Characters </p>
        </div>
        <div className="navbar-dropdown"> 
            <p> Guilds </p>
        </div>
        <div className="navbar-dropdown"> 
            <p> Raid Progress </p>
        </div>
        <div className="navbar-dropdown"> 
            <p> Settings </p>
        </div>
      </div>
    );
  }
}

export default Navbar;