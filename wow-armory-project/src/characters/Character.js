import React, { Component } from 'react';
import axios from 'axios';
import * as ApiUtility from '../api_utility/ApiUtility.js';
import './Character.css';

import { Row, Col } from 'react-bootstrap';

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

    this.forge_map = [
      {id: 3570, value: "Legendary"},
      {id: 3336, value: "Warforged"},
      {id: 3337, value: "Titanforged"}
    ]
  }

  determineSlot(slot, items) {
    switch (slot) {
      case "back": {
        return items.back;
      }
      case "chest": {
        return items.chest;
      }
      case "feet": {
        return items.feet;
      }
      case "finger1": {
        return items.finger1;
      }
      case "finger2": {
        return items.finger2;
      }
      case "hands": {
        return items.hands;
      }
      case "head": {
        return items.head;
      }
      case "legs": {
        return items.legs;
      }
      case "mainHand": {
        return items.mainHand;
      }
      case "offHand": {
        return items.offHand;
      }
      case "neck": {
        return items.neck;
      }
      case "shirt": {
        return items.shirt;
      }
      case "shoulder": {
        return items.shoulder;
      }
      case "tabard": {
        return items.tabard;
      }
      case "trinket1": {
        return items.trinket1;
      }
      case "trinket2": {
        return items.trinket2;
      }
      case "waist": {
        return items.waist;
      }
      case "wrist": {
        return items.wrist;
      }
      default: {
        console.log("Invalid choice");
        return "item not found";
      }
    }
  }

  determineDifficulty(context) {
    if (context === 'raid-heroic') {
      return 'Heroic';
    } else if (context === 'raid-mythic') {
      return 'Mythic';
    } else if (context === 'raid-raid-finder') {
      return 'Raid Finder';
    } else if (context === 'challenge-mode-jackpot') {
      return "Mythic +"
    } else if (context === "") {
      return ""
    } else {
      return 'Normal';
    }
  }

  determineForge (bonus_list) {
    for (var i = 0; i < bonus_list.length; i++) {
      if (bonus_list[i] === 3570){
        return this.forge_map.find(x => x.id == bonus_list[i]).value;
      } else if (bonus_list[i] === 3336) {
        return this.forge_map.find(x => x.id == bonus_list[i]).value;
      } else if (bonus_list[i] === 3337) {
        return this.forge_map.find(x => x.id == bonus_list[i]).value;
      }
    }
    return "";
  }

  determineRarity(quality_val) {
    //rare = 3 leg= 5 purp =4 green 2 heirloom = 7 normal =1 busted =0
    if (quality_val === 4) {
      return "epic";
    } else if (quality_val === 3) {
      return "rare";
    } else if (quality_val === 5) {
      return "legendary";
    } else if (quality_val === 2) {
      return "magic";
    } else if (quality_val === 7) {
      return "heirloom"
    } else if (quality_val === 1) {
      return "normal";
    } else if (quality_val === 6) {
      return "artifact";
    } else {
      return "junk";
    }
  }

  determineNameColor(rarity) {
    let color = "";
    if (rarity === "legendary") {
      color = 'orange';
    } else if (rarity === "heirloom") {
      color = '#f7e8b2';
    } else if (rarity ==="epic") {
      color = '#9455cc';
    } else if (rarity === "rare") {
      color = '#1d86e2';
    } else if (rarity === "magic") {
      color = '#05c118';
    } else if (rarity === "junk") {
      color = "grey";
    } else if (rarity === "artifact") {
      color = "#fcdba9";
    } else if (rarity === "normal") {
      color = "black";
    }

    return color;
  }

  createItem(slot, side) {
    var _side = "";
    if (side === 'right') {
      _side = 'left';
    } else {
      _side = 'right';
    }

    let items       = this.state.items;
    let _item       = this.determineSlot(slot, items);
    let ilvl        = "";
    let difficulty  = "";
    let forge_level = "";
    let name        = "";
    let rarity      = "";
    let icon_url    = "";
    let alt_text    = "";
    if (typeof _item !== 'undefined') {
      name        = _item.name;
      ilvl        = "Item Level " + _item.itemLevel;
      rarity      = this.determineRarity(_item.quality);
      difficulty  = this.determineDifficulty(_item.context);
      forge_level = this.determineForge(_item.bonusLists);
      icon_url    = 'http://media.blizzard.com/wow/icons/56/' + _item.icon + '.jpg';
      alt_text    = _item.name;
      if (slot === 'offHand') {
        name += ", off-hand"
      }
    }
  
    var item_card_style = {
      fontSize: 16,
      textAlign: _side,
      borderTop: 1,
      borderBottom:1,
      padding: 5
    };

    var difficulty_style = {
      color: '#49fb35',
      fontSize: 14,
      margin: 0
    };

    var name_style = {
      color: this.determineNameColor(rarity),
      margin: 0,
      fontSize: 14
    }

    var icon_style = {
      float: _side,
      verticalAlign: 'middle',
      border: '2px solid'
    };

    var icon_wrapper = {
      paddingLeft: 10,
      paddingRight:10
    }

    var item_level_style = {
      color: '#ffcc00',
      fontSize: 14,
      margin: 0
    };

    return (
      <div style={item_card_style}>
        <div style={icon_wrapper}>
          <img style={icon_style} src={icon_url} alt={alt_text} />
        </div>
        <p style={name_style}> {name} </p>
        <p style={difficulty_style}> {difficulty} {forge_level}</p>
        <p style={item_level_style}> {ilvl} </p>
      </div>
    );
  }

  /* Request data from WoW API */
  componentWillMount() {
    let fields = ["items", "achievements"];
    //BjÖrdin
    axios.get(ApiUtility.determineApiCall("character", "Wyrmrest-Accord", "", "Daze", fields))
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
    if (this.state.is_loaded === true) {
      let character = this.state.character;
      let items = this.state.items;
      console.log(items);
      return (
        <div class="character_overview">
          <h3 class="character_name"> {character.name} </h3>
          <h4> {items.averageItemLevel} Avg. Item Level</h4>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("head", "left")}</Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> {this.createItem("hands", "right")} </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("neck", "left")}</Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> {this.createItem("waist", "right")} </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("shoulder", "left")}</Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> {this.createItem("legs", "right")} </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("back", "left")} </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> {this.createItem("feet", "right")} </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("chest", "left")} </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> {this.createItem("finger1", "right")} </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("shirt", "left")} </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> {this.createItem("finger2", "right")} </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("tabard", "left")} </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> {this.createItem("trinket1", "right")} </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}> {this.createItem("wrist", "left")} </Col>
            <Col xsHidden={6} md={4}>  </Col>
            <Col xs={6} md={4}> {this.createItem("trinket2", "right")} </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={6}> {this.createItem("mainHand", "left")} </Col>
             <Col xsHidden={6} md={2}>  </Col>
            <Col xs={6} md={6}> {this.createItem("offHand", "right")} </Col>
          </Row>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Character;