import React, { Component } from 'react';
import Checkbox from 'react-native-check-box';

export default class Checky extends Component {
  render() {
    return (
      <Checkbox
        isChecked={this.props.value}
        onClick={this.props.onClick}
      />
    );
  }
}