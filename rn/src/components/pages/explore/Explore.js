import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import NearbyTable from './NearbyTable';
import ViewTable from './ViewTable';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { TableApi, UserApi } from '../../../api';
import ButtonSmall from '../../ui_elems/ButtonSmall';
import Map from '../../ui_elems/Map';
import { connect } from 'react-redux';


class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: ["1", "2"],
      tables: [],
      view: "nearby",
      tableID: "nibba",
      mapView: false
    };
  }

  componentDidMount = async () => {
    let tables = [];
    let users = [];
    try {
      let res = await TableApi.findAll();
      tables = await res.data
    } catch (e) {
      await
        this.setState({ tables: [] });
      // ToastAndroid.show(e.response.data.message, 'Failed to fetch tables');
    }
    this.setState({
      tables: tables,
    });
  };

  goToNearbyView = () => {
    this.setState({
      view: "nearby"
    });
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    R = 6371; // Radius of the earth in km
    dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    dLon = this.deg2rad(lon2 - lon1);
    a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  navigateToTable = () => {
    this.props.navigation.navigate('Table');
  };

  displayNearby = () => {
    return (
      <ScrollView>
        <View>
          <StatusBar backgroundColor="#055" barStyle="light-content" />
          <ButtonSmall text="Map View" onPress={() => this.setState({ mapView: true })} />

          {this.state.tables.map((table, key) => {
            return (
              <NearbyTable
                key={key}
                players={table.players}
                games="Settlers of Catan, Monopoly, Scrabble"
                host={table.host.firstName}
                photoURL={table.photoURL}
                distance={this.getDistanceFromLatLonInKm(
                  this.props.latitude, 
                  this.props.longitude, 
                  table.location.lat, 
                  table.location.lng
                  )}
                start={table.startTime}
                {...this.props}
                onPress={() => {
                  this.displayTable(table._id);
                }}
              />
            );
          })
        //   .sort(function(a, b){
        //     keyA = a.distance
        //     keyB = b.distance
        //     // Compare the 2 dates
        //     if(a.distance < b.distance) return -1
        //     if(a.distance > b.distance) return 1
        //     return 0
        // })
        }
        </View>
      </ScrollView>);
  }

  displayTable = tableID => {
    this.setState({
      view: "table",
      tableID: tableID
    })
  }

  render() {
    if (this.state.mapView) {
      return (
        <View style={{ flex: 1 }}>
          <ButtonSmall text="List View" onPress={() => this.setState({ mapView: false })} />
          <Map tables={this.state.tables} />
        </View>
      )
    }
    else {
      if (this.state.view == "nearby") {
        return this.displayNearby();
      } else {
        return (
          <ViewTable
            id={this.state.tableID}
            return={this.goToNearbyView}
            navigateToTable={this.navigateToTable}
          />
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    latitude: state.location.latitude,
    longitude: state.location.longitude
  }
}

export default connect(mapStateToProps)(Explore)
