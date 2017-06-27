import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-dropdown"> 
            <p> <Link to="/"> Home </Link></p>
        </div>
        <div className="navbar-dropdown"> 
            <p> <Link to="/characters"> Characters </Link></p>
        </div>
        <div className="navbar-dropdown"> 
            <p> <Link to="/guilds"> Guilds </Link></p>
        </div>
        <div className="navbar-dropdown"> 
            <p> <Link to="/raidprogress"> Raid Progress </Link></p>
        </div>
        <div className="navbar-dropdown"> 
            <p> Settings </p>
        </div>
      </div>
    );
  }
}

export default Navbar;