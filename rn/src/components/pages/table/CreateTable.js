import React, { Component } from 'react';
import { View, ScrollView, Text, Picker } from 'react-native';
import Input from '../../ui_elems/Input';
import Button from '../../ui_elems/Button';
import DateTimeInput from '../../ui_elems/DateTimeInput';
import GamePicker from '../../ui_elems/GamePicker';
import { TableApi } from '../../../api';
const moment = require('moment');

class CreateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      dateTime: "",
      maxPlayers: 4,
      games: []
    };
  }

  setLocation = location => {
    this.setState({
      location: location
    });
  }

  setDateTime = dateTime => {
    this.setState({
      dateTime: dateTime
    });
  }

  setMaxPlayers = maxPlayers => {
    this.setState({
      maxPlayers: maxPlayers
    });
  }

  addGame = game => {
    this.setState(prevState => {
      if (prevState.games.map(game => game._id).includes(game._id)) {
        return;
      } else {
        return {
          games: prevState.games.slice(0).push(game)
        };
      }
    });
  }

  removeGame = game => {
    this.setState(prevState => {
      if (prevState.games.map(game => game._id).includes(game._id)) {
        let gamesOut = prevState.games.slice(0);
        gamesOut.splice(gamesOut.map(game => game._id).indexOf(game._id), 1);
        return {
          games: gamesOut
        }
      } else {
        return;
      }
    })
  }

  getLatLong = (address) => {
    return {lat: 0.1, lng: 0.1};
  }

  createTable = () => {
    try {
      TableApi.create({
        host: this.props.user,
        games: this.state.games.map(game => game._id),
        players: [],
        joinRequests: [],
        startTime: moment(this.state.dateTime).toDate(),
        maxPlayers: this.state.maxPlayers,
        location: getLatLong(),
        status: "Scheduled"
      });
    } catch {
    }
  }

  cancelTable = () => {
    this.props.cancelAction();
  }

  getGames = () => {
    this.state.games.map(game =>
      <View>
        <Text>{game.name}</Text>
        <Button
          text="remove"
          onPress={this.removeGame(game)}
        />
      </View>
    );
  }

  render() {
    return <ScrollView>
      <Input
        label="Location"
        value={this.state.location}
        onChangeText={this.setLocation}
      />
      <DateTimeInput
        label="Date and time"
        onChangeDate={this.setDateTime}
        date={this.state.dateTime}
      />
      <Picker
        selectedValue={this.state.maxPlayers}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({maxPlayers: itemValue})
        }>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
      <Text>Choose games</Text>
      {this.getGames()}
      <GamePicker
        onSelectGame={this.addGame}
      />
      <Button
        text="Cancel"
        onPress={this.cancelTable}
      />
      <Button
        text="Create"
        onPress={this.createTable}
      />
    </ScrollView>;
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(CreateTable);