import React, { Component } from 'react';
import axios from 'axios';
import FixedDataTable from 'fixed-data-table';
import * as ApiUtility from '../api_utility/ApiUtility.js';
import * as CharacterUtility from '../characters/character_utils/CharacterUtility.js';

import './Guild.css';
import 'bootstrap/dist/css/bootstrap.css';

const { Table, Column, Cell } = FixedDataTable;
class Guilds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guild: [],
      realm: [],
      members: [],
      isLoaded: false
    };
  }

  /* Request data from WoW API */
  componentDidMount() {
    let fields = ["members"];
    axios.get(ApiUtility.determineApiCall("guild", "Wyrmrest-Accord", "Equanimity", "", fields))
      .then(res => {
        this.setState({
          guild: res.data.name,
          realm: res.data.realm,
          members: res.data.members,
          isLoaded: true
        });
      });
  }

  render() {
    if (this.state.isLoaded) {
      let strippedMembers = CharacterUtility.stripUneededDetails(this.state.members);
      let finalMembers = CharacterUtility.convertGenderAndRaceToString(strippedMembers);
      return (
        <Table
          rowsCount={finalMembers.length}
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
            cell={props => (
              <Cell {...props}>
                {finalMembers[props.rowIndex].gender + " " +
                  finalMembers[props.rowIndex].race + " " +
                  finalMembers[props.rowIndex].class}
              </Cell>
            )}
            width={200}
          />
        </Table>
      );
    } else {
      return null;
    }
  }
}

export default Guilds;