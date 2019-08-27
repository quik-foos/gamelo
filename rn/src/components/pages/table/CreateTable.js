import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, Picker } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Fumi } from 'react-native-textinput-effects';
import Input from '../../ui_elems/Input';
import Button from '../../ui_elems/Button';
import ButtonSmall from '../../ui_elems/ButtonSmall';
import DateTimeInput from '../../ui_elems/DateTimeInput';
import GamePicker from '../../ui_elems/GamePicker';
import { TableApi } from '../../../api';
import { connect } from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';


const moment = require('moment');

class CreateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      startDateTime: "",
      endDateTime: "",
      maxPlayers: 4,
      games: []
    };
  }

  showLocationPicker = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({
          latitude: place.location.latitude,
          longitude: place.location.longitude
        })
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  setLocation = location => {
    this.setState({
      location: location
    });
  }

  setStartDateTime = dateTime => {
    formatted = `${dateTime}`.split("").slice(0,21).join('')
    this.setState({
      startDateTime: formatted
    });
  }

  setEndDateTime = dateTime => {
    formatted = `${dateTime}`.split("").slice(0,21).join('')
    this.setState({
      endDateTime: dateTime
    });
  }

  setMaxPlayers = maxPlayers => {
    this.setState({
      maxPlayers: maxPlayers
    });
  }

  addGame = game => {
    this.setState(prevState => {
      if (prevState.games.map(g => g._id).includes(game._id)) {
        return;
      } else {
        let gamesOut = prevState.games.slice(0);
        gamesOut.push(game);
        return ({ games: gamesOut });
      }
    });
  }

  removeGame = game => {
    this.setState(prevState => {
      if (prevState.games.map(g => g._id).includes(game._id)) {
        let gamesOut = prevState.games.slice(0);
        gamesOut.splice(gamesOut.map(g => g._id).indexOf(game._id), 1);
        return {
          games: gamesOut
        }
      } else {
        return;
      }
    })
  }

  createTable = () => {
    console.log("Trying to create a table with startTime: ")
    console.log(this.state.startDateTime)
    try {
      TableApi.create({
        host: this.props.user,
        // games: this.state.games.map(game => game._id),
        players: [this.props.user],
        joinRequests: [],
        photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc1Ctdj6bnwNtgh1VB8hdGCD672Kewkxt9k_yrQBqokgEqpILkvg",
        startTime: this.state.startDateTime,
        endTime: this.state.endDateTime,
        maxPlayers: this.state.maxPlayers,
        location: 
        {
          lng: this.state.longitude,
          lat: this.state.latitude
        },
        status: "Scheduled"
      });
    } catch(e) {
      console.log(e)
    }
    this.cancelTable()
  }

  cancelTable = () => {
    this.props.cancelAction();
  }

  getGames = () => {
    return this.state.games.map((game, id) =>
      <View key={id}>
        <Text>{game.name}</Text>
        <ButtonSmall
          text="remove"
          onPress={() => { this.removeGame(game) }}
        />
      </View>
    );
  }

  render() {
    return <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleText}>Create a Table</Text>
        <Fumi
          label={'Location'}
          iconClass={FontAwesomeIcon5}
          iconName={'dice-one'}
          iconColor={'#005756'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          value={`${this.state.latitude}${this.state.longitude ? ',' : ''} ${this.state.longitude}`}
          onFocus={() => this.showLocationPicker()}
        />
        <View height={90}>
          <Text></Text>
          <DateTimeInput
            label="Start Date and time"
            onChangeDate={this.setStartDateTime}
            date={this.state.startDateTime}
          />
          <Text></Text>
        </View>
        <View height={90}>
          <Text>End Date and Time</Text>
          <DateTimeInput
            label="End Date and time"
            onChangeDate={this.setEndDateTime}
            date={this.state.endDateTime}
          />
          <Text></Text>
        </View>
        <View height={90}>
          <Text>Max players</Text>
          <Picker
            selectedValue={this.state.maxPlayers}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ maxPlayers: itemValue })
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
        </View>
        <View heigth={90}>
          <Text>Choose games</Text>
          {this.getGames()}
          <GamePicker
            onSelectGame={this.addGame}
          />
        </View>
      </View>
      <ButtonSmall
        text="Cancel"
        onPress={this.cancelTable}
      />
      <ButtonSmall
        text="Create"
        onPress={this.createTable}
      />
    </ScrollView>;
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 15,
  },
  titleText: {
    fontSize: 32,
    marginBottom: 15
  }
});

export default connect(mapStateToProps)(CreateTable);