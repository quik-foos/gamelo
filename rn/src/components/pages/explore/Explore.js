import React, {Component} from 'react';
import {View, Text} from 'react-native';
import NearbyTable from './NearbyTable';
import {ScrollView} from 'react-native-gesture-handler';

export default class Explore extends Component {
  render() {
    return (
      <ScrollView>
        <View>
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
