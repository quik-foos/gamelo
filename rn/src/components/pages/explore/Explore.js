import React, {Component} from 'react';
import {View, Text} from 'react-native';
import NearbyTable from './NearbyTable';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  navigateToTable = table_id => {
    this.props.navigation.navigate('Table'), {table_id: table_id};
  };

  render() {
    return (
      <ScrollView>
        <View>
          <NearbyTable
            games="Settlers of Catan, Monopoly, Scrabble"
            host="Fred"
            distance="600m"
            start="6pm"
            {...this.props}
            onPress={() => {
              this.navigateToTable(this.state.data)}}
          />

          <NearbyTable
            games="Ticket to Ride, Pandemic"
            host="Wayne"
            distance="940m"
            start="7pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />

          <NearbyTable
            games="Codenames, Telestrations, Connect 4"
            host="Lucas"
            distance="1.3km"
            start="7:30pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />
          <NearbyTable
            games="Settlers of Catan, Monopoly, Scrabble"
            host="Fred"
            distance="600m"
            start="6pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />

          <NearbyTable
            games="Ticket to Ride, Pandemic"
            host="Wayne"
            distance="940m"
            start="7pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />

          <NearbyTable
            games="Codenames, Telestrations, Connect 4"
            host="Lucas"
            distance="1.3km"
            start="7:30pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />
          <NearbyTable
            games="Settlers of Catan, Monopoly, Scrabble"
            host="Fred"
            distance="600m"
            start="6pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />

          <NearbyTable
            games="Ticket to Ride, Pandemic"
            host="Wayne"
            distance="940m"
            start="7pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />

          <NearbyTable
            games="Codenames, Telestrations, Connect 4"
            host="Lucas"
            distance="1.3km"
            start="7:30pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />
          <NearbyTable
            games="Settlers of Catan, Monopoly, Scrabble"
            host="Fred"
            distance="600m"
            start="6pm"
            {...this.props}
            onPress={() => {
                this.navigateToTable(this.state.data)}}
          />

          <NearbyTable
            games="Ticket to Ride, Pandemic"
            host="Wayne"
            distance="940m"
            start="7pm"
          />

          <NearbyTable
            games="Codenames, Telestrations, Connect 4"
            host="Lucas"
            distance="1.3km"
            start="7:30pm"
          />
          <NearbyTable
            games="Settlers of Catan, Monopoly, Scrabble"
            host="Fred"
            distance="600m"
            start="6pm"
          />

          <NearbyTable
            games="Ticket to Ride, Pandemic"
            host="Wayne"
            distance="940m"
            start="7pm"
          />

          <NearbyTable
            games="Codenames, Telestrations, Connect 4"
            host="Lucas"
            distance="1.3km"
            start="7:30pm"
          />
        </View>
      </ScrollView>
    );
  }
}
