import React, { Component } from 'react';
import { Picker } from 'react-native';
import { GameApi } from '../../api';


export default class GamePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
        data: data.slice(1, 20)
      });
    } catch {
    }
  }

  getPickerItems = () => {
    return this.state.data.map(datum =>
      <Picker.Item key={datum._id} label={datum.name} value={datum._id}/>
    );
  }

  render() {
    return (
      <Picker
        selectedValue={this.props.value}
        onValueChange={this.props.onSelectGame}
      >
        {this.getPickerItems()}
      </Picker>
    );
  }
}