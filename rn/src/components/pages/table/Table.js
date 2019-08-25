import React, {Component} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import ButtonSmall from '../../ui_elems/ButtonSmall';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 6,
      status: 'Available',
      players: ['Fred', 'Wayne', 'Michael', 'Lucas', "Aizen"],
      joinRequests: ['Jimmy Zhang', 'Bool Ceanz'],
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
    const { buttonContainer, tableContainer} = styles;
    return (
      <View >
        <View style={tableContainer}>
          <Text> Fred's Table{'\n'}</Text>
          <Text>Current Players {this.state.players.length}/{this.state.max}{'\n'}</Text>

          {this.state.players.map((data, key) => {
            return (
              <TouchableOpacity key={key} onPress={this.navigateToProfile}>
                <Text>
                  {data} {'\n'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ButtonSmall text="Request to Join" onPress={this.requestJoin} />
       
       
        <Text>
          Status: {this.state.status}
          {'\n\n'}
        </Text>

        <Text>Join Requests{'\n'}</Text>
        {this.state.joinRequests.map((request, key) => {
          return (
            <View key={key}>
              <Text>{request}</Text>
              <View style ={buttonContainer}>
              <ButtonSmall style={smol} text="Accept"/>
              <ButtonSmall text="Reject"/>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
const styles = {
  tableContainer:{
   margin:10
  },
  buttonContainer: {
    flexDirection: 'row',
  },
}
export default Table;
