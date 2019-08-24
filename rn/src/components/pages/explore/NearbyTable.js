import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../../ui_elems/Button';
import {TouchableOpacity} from 'react-native';

export default class NearbyTable extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View>
          <Text>
            {this.props.host} {'\n'}
            {this.props.distance} {this.props.start} {'\n'}
            Games: {this.props.games}
            {'\n\n'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
