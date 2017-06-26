import React, { Component } from 'react';
import axios from 'axios';
import FixedDataTable from 'fixed-data-table';
import * as ApiUtility from '../api_utility/ApiUtility.js';
import './Character.css';

import { Table, Row, Col } from 'react-bootstrap';

class Character extends Component {

  getInitialState() {
    return {
      is_loaded: false
    }
  }
  
  constructor(props) {
    super(props);

    

    this.state = {
      character: [],
      items: [],
      achievements: []
    }

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


  createItem(slot) {

    let items = this.state.items;

    var item_card_style = {
      width: 50,
      align: 'center'
    };
    var difficulty_style = {
      color: 'green',
      fontSize: 12,
      float: 'left'
    };
    var name_style = {
      color: 'black',
      fontSize: 14
    };

    var icon_url = 'http://us.battle.net/static-render/us/icon/' + items.head.icon;

    return (
      <div style={item_card_style}>
        <img src={icon_url} />
        <p style={name_style}> name </p>
        <p> ilvl </p>
        <p style={difficulty_style}> difficulty </p>
      </div>
    );
  }

  /* Request data from WoW API */
  componentWillMount() {
    let fields = ["items", "achievements"];
    axios.get(ApiUtility.determineApiCall("character", "Wyrmrest-Accord", "", "Neelis", fields))
      .then(res => {
        this.setState({
          character: res.data,
          items: res.data.items,
          achievements: res.data.achievements,
          is_loaded: true
        }, () => {
          //let _items = this.changeThumbnailUrl(this.state.items);
        });
      });
  }
  render() {
    if (this.state.is_loaded == true) {
      let character = this.state.character;
      let items = this.state.items;
      console.log(items.head.icon);
      return (
        <div class="character_overview">
          <h3 class="character_name"> {character.name} </h3>
          <h4> {items.averageItemLevel} Avg. Item Level</h4>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("helm")}</Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> Gloves </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> Neck</Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> Belt </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> Shoulders</Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> Pants </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> Back </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> Boots </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> Chest </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> Ring1 </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> Shirt </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> Ring2 </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> Tabard </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> Trinket2 </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> Wrist </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> Trinket2 </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={12}> Weapon </Col>
          </Row>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Character;