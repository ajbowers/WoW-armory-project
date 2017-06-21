import React, { Component } from 'react';
import axios from 'axios';
import FixedDataTable from 'fixed-data-table';
import apiConfig from '../config.json';
import './RaidProgress.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'fixed-data-table/dist/fixed-data-table-base.css';
import 'fixed-data-table/dist/fixed-data-table-style.css';
import 'fixed-data-table/dist/fixed-data-table.css';

let api = apiConfig.api;
const {Table, Column, Cell} = FixedDataTable;

class RaidProgress extends Component {
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

  convertClass(members) {
    let convertedMembers = members;
    for (var i = 0; i < convertedMembers.length; i++) {
      for (var j = 0; j < this.class_map.length; j++ ) {
        if (this.class_map[j].id == members[i].class) {
          convertedMembers[i].class = this.class_map[j].class;
          break;
        }
      }
    }
    return convertedMembers;
  }

  convertRace(members) {
    let convertedMembers = members;
     for (var i = 0; i < convertedMembers.length; i++) {
      for (var j = 0; j < this.race_map.length; j++ ) {
        if (this.race_map[j].id == members[i].race) {
          convertedMembers[i].race = this.race_map[j].race;
          break;
        }
      }
    }
    
    return convertedMembers;
  }

  convertGender(members) {
    let genderConvert = members;
    for (var i = 0; i < members.length; i++) {
      if (this.gender_map[0].id == genderConvert[i].gender) {
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
        name: members[i].character.name,
        race: members[i].character.race,
        achievementPoints: members[i].character.achievementPoints,
        thumbnail: 'http://us.battle.net/static-render/us/' + members[i].character.thumbnail,
        class: members[i].character.class,
        gender: members[i].character.gender
      });
    }
    return temp;
  }
  buildUrl() {
    var api_root = api.apiRoot;
    var path = api.apiGuildPath;
    var locale = api.apiLocaleString;
    var key = api.apiKey;
    var field = "members";
    var guildName = "Equanimity";
    var realm = "Wyrmrest-Accord/";
    var apiUrl = api_root + path + realm + guildName + "?fields=" + field + "&" + locale + "&apikey=" + key;
    return apiUrl;
  }

  componentDidMount() {
    axios.get(this.buildUrl())
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
    let finalMembers = this.convertGenderAndRaceToString(strippedMembers);
    return (
      <Table
        rowsCount={this.state.members.length}
        rowHeight={100}
        headerHeight={50}
        height={1000}
        width={1500}>
         <Column
          header={<Cell> Avatar </Cell>}
          cell={props => (
            <Cell {...props}>
              <img src={finalMembers[props.rowIndex].thumbnail} />
            </Cell>
          )}
          fixed={true}
          width={100}
          height={100}
        />
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

export default RaidProgress;