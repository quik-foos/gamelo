import React, {Component} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import ButtonSmall from '../../ui_elems/ButtonSmall';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Available',
      players: ['Fred', 'Wayne', 'Michael', 'Lucas'],
    };
  }
  requestJoin = () => {
    Alert.alert('Request Sent!');
    this.setState({
      status: 'Requested',
    });
  };
  navigateToProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  render() {
    return (
      <View>
        <Text> Fred's Table{'\n'}</Text>
        <Text>Current Players{'\n'}</Text>

        {this.state.players.map((data, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={this.navigateToProfile}>
              <Text>
                {data} {'\n'}
              </Text>
            </TouchableOpacity>
          );
        })}
        <ButtonSmall text="Request to Join" onPress={this.requestJoin} />
        <Text>Status: {this.state.status}</Text>
      </View>
    );
  }
}

export default Table;
