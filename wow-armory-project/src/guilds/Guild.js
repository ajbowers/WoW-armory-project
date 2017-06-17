import React, { Component } from 'react';
import axios from 'axios';
import ReactDataGrid from 'react-data-grid';
import './Guild.css';

import 'bootstrap/dist/css/bootstrap.css';

let apiUrl = "https://us.api.battle.net/wow/guild/Wyrmrest-Accord/Equanimity?fields=members&locale=en_US&apikey=zcq8e9k5a4mqgucv2u5rb2jbcq4dyzmr";


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
    ]
  }

  componentDidMount() {
    axios.get(apiUrl)
      .then(res => {
        const guild = res.data        
        this.setState({ 
          guild: res.data.name,
          realm: res.data.realm,
          members: res.data.members
        },()=>{
          console.log(this.state.members[0]);
        });
    });
  }

  render() {
    //make call to generate table
    let membersDisplay = this.state.members.map((member, index)=> {
      return (
        <div key={index}>
          <ReactDataGrid columns={this.guild_member_columns} />

        </div>
      );
    });
    return (
      <div> {membersDisplay} </div>
    );
  }
}

export default Guilds;