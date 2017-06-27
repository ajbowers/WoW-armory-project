import React, { Component } from 'react';
import axios from 'axios';
import FixedDataTable from 'fixed-data-table';
import * as ApiUtility from '../api_utility/ApiUtility.js';

import './Guild.css';
import 'bootstrap/dist/css/bootstrap.css';

const {Table, Column, Cell} = FixedDataTable;
class Guilds extends Component {

  constructor(props) {
    super(props);

    this.state = {
      guild: [],
      realm: [],
      members: []
    };

    this.gender_map = [
      { id: "0", gender: "Male" },
      { id: "1", gender: "Female" }
    ];

    this.race_map = [
      { id: "1", race: "temp" },
      { id: "2", race: "Orc" },
      { id: "3", race: "temp" },
      { id: "4", race: "temp" },
      { id: "5", race: "Undead" },
      { id: "6", race: "Tauren" },
      { id: "7", race: "temp" },
      { id: "8", race: "Troll" },
      { id: "9", race: "Goblin" },
      { id: "10", race: "Blood Elf" },
      { id: "26", race: "Pandarian" }
    ];

    this.class_map = [
      { id: "1", class: "Warrior" },
      { id: "2", class: "Paladin" },
      { id: "3", class: "Hunter" },
      { id: "4", class: "Rogue" },
      { id: "5", class: "Priest" },
      { id: "6", class: "Death Knight" },
      { id: "7", class: "Shaman" },
      { id: "8", class: "Mage" },
      { id: "9", class: "Warlock" },
      { id: "10", class: "Monk" },
      { id: "11", class: "Druid" },
      { id: "12", class: "Demon Hunter" },
    ]
  }

  /* Converts class api code into string */
  convertClass(members) {
    let classConvert = members;
    for (var i = 0; i < classConvert.length; i++) {
      for (var j = 0; j < this.class_map.length; j++ ) {
        if (this.class_map[j].id === members[i].class) {
          classConvert[i].class = this.class_map[j].class;
          break;
        }
      }
    }
    return classConvert;
  }

  /* Converts race api code into string race */
  convertRace(members) {
    let raceConvert = members;
     for (var i = 0; i < raceConvert.length; i++) {
      for (var j = 0; j < this.race_map.length; j++ ) {
        if (this.race_map[j].id === members[i].race) {
          raceConvert[i].race = this.race_map[j].race;
          break;
        }
      }
    }
    
    return raceConvert;
  }

  /* Converts gender api code into string */
  convertGender(members) {
    let genderConvert = members;
    for (var i = 0; i < members.length; i++) {
      if (this.gender_map[0].id === genderConvert[i].gender) {
        genderConvert[i].gender = this.gender_map[0].gender;
      } else {
        genderConvert[i].gender = this.gender_map[1].gender;
      }
    }
    return genderConvert;
  }

  convertGenderAndRaceToString(members) {
    let gender_convert = this.convertGender(members);
    let race_convert   = this.convertRace(members);
    let class_convert  = this.convertClass(members);

    for (var i = 0; i < members.length; i++) {
      members[i].class = gender_convert[i].gender + " " + race_convert[i].race + " " + class_convert[i].class;
    }
    return members;
  } 

  stripUneededDetails(members) {
    let temp = [];
    for (let i = 0; i < members.length; i++) {
      temp.push({
        id: i,
        name:              members[i].character.name,
        race:              members[i].character.race,
        achievementPoints: members[i].character.achievementPoints,
        thumbnail:         'http://us.battle.net/static-render/us/' + members[i].character.thumbnail,
        class:             members[i].character.class,
        gender:            members[i].character.gender
      });
    }
    return temp;
  }

  /* Request data from WoW API */
  componentDidMount() {
    let fields = ["members"];
    axios.get(ApiUtility.determineApiCall("guild","Wyrmrest-Accord", "Equanimity", "", fields))
      .then(res => {
        this.setState({
          guild: res.data.name,
          realm: res.data.realm,
          members: res.data.members
        });
      });
  } 

  render() {
    let strippedMembers = this.stripUneededDetails(this.state.members);
    let finalMembers    = this.convertGenderAndRaceToString(strippedMembers);
    return (
      <Table
        rowsCount={this.state.members.length}
        rowHeight={100}
        headerHeight={50}
        maxHeight={800}
        width={1500}>
        <Column
          header={<Cell>Name</Cell>}
          cell={props => (
            <Cell {...props}>
              {finalMembers[props.rowIndex].name}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell> Class </Cell>}
          cell={props=> (
            <Cell {...props}>
              {finalMembers[props.rowIndex].class}
            </Cell>
          )}
          width={200}
        />
      </Table>
    );
	}
}

export default Guilds;