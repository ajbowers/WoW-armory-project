import React, { Component } from 'react';
import axios from 'axios';
import ReactDataGrid from 'react-data-grid';
import './Guild.css';
import apiConfig from '../config.json';

import 'bootstrap/dist/css/bootstrap.css';


let api = apiConfig.api;


class Guilds extends Component {

  // Constructor to create properties for ajax requests through axios
  constructor(props) {
    super(props);

    this.state = {
      guild: [],
      realm: [],
      members: []
    };

    this.guild_member_columns = [
      {key: 'character.name', name:'Character Name'},
      {key: 'character.race', name:'Race'},
      {key: 'character.gender', name:'Gender'}
    ];
  } 

  buildUrl() {
    var api_root  = api.apiRoot;
    var path      = api.apiGuildPath;
    var locale    = api.apiLocaleString;
    var key       = api.apiKey;
    var field     = "members";
    var guildName = "Equanimity";
    var realm     = "Wyrmrest-Accord/";
    var apiUrl    = api_root + path + realm + guildName + "?fields=" + field + "&" + locale + "&apikey=" + key;
    return apiUrl;
  }

  componentDidMount() {
    axios.get(this.buildUrl())
      .then(res => {       
        this.setState({ 
          guild: res.data.name,
          realm: res.data.realm,
          members: res.data.members
        })
    });
  } 

  render() {
    //make call to generate table
    let membersTest = this.state.members;
    const rowGetter = rowNumber => membersTest[rowNumber];
    /*let membersDisplay = membersTest.map((member, index)=> {
      return (
        <div key={index}>
          
        </div>
      );
    }); */
    return (
      <div> 
        <ReactDataGrid 
              columns={this.guild_member_columns}
              rowGetter={rowGetter}
              rowsCount={membersTest.length}
          />
      </div>
    );
  }
}

export default Guilds;