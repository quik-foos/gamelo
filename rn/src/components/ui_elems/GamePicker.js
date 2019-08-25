import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Button from '../ui_elems/Button';
import { GameApi } from '../../api';


export default class GamePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await GameApi.findAll();
      const data = await response.data;
      this.setState({
        data: data
      });
    } catch {
    }
  }

  render() {
    return <SearchableDropdown
      {...this.props}
      items={this.state.data.map(game => game.name)}
    />
  }
}
