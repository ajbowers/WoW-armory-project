import React, { Component } from 'react';
import axios from 'axios';
import FixedDataTable from 'fixed-data-table';
import * as ApiUtility from '../api_utility/ApiUtility.js';
import './Character.css';

class Item extends Component {

  constructor(props) {
    super(props);
    /*
        
    */
    this.state = {
      character: [],
      items: [], 
      achievements: []
    }
  }

   /* Request data from WoW API */
  componentDidMount() {
    let fields = ["items", "achievements"];
    axios.get(ApiUtility.determineApiCall("character","Wyrmrest-Accord", "", "Neelis", fields))
      .then(res => {
        this.setState({
          character: res.data,
          items: res.data.items,
          achievements: res.data.achievements
        });
      });

  } 

  render() {
    console.log(this.state.items);
    let character = this.state.character;
    return (
        <div class="character_overview">
            <h3 class="character_name"> {character.name} </h3>
            <table>
                <tr>
                    <th colspan='2'> Equipment </th>
                </tr>
                <tr>
                    <td> Helm </td> 
                    <td> Gloves </td>
                </tr>
                <tr>
                    <td> Neck </td>
                    <td> Belt </td>
                </tr>
                <tr>
                    <td> Shoulders </td>
                    <td> Pants </td>
                </tr>
                <tr>
                    <td> Back </td>
                    <td> Boots </td>
                </tr>
                <tr>
                    <td> Chest </td>
                    <td> Ring1 </td>
                </tr>
                <tr>
                    <td> Shirt </td>
                    <td> Ring2 </td>
                </tr>
                <tr>
                    <td> Tabard </td>
                    <td> Trinket1 </td>
                </tr>
                <tr>
                    <td> Wrist </td>
                    <td> Trinket2 </td>
                </tr>
                <tr>
                    <td colspan='2'> Weapon </td> 
                </tr>
            </table>
        </div>
    );
  }
}

export default Character;