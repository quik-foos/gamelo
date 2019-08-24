import React, { Component } from 'react';
import SideNavigator from './side_navigation';
import BottomNavigator from './bottom_navigation';
import StackNavigator from './stack_navigation';
import { connect } from 'react-redux';
import { setLocationAction } from '../actions';
import Geolocation from '@react-native-community/geolocation';

class Navigator extends Component {
  getNavigator() {
    return this.props.user ? <BottomNavigator /> : <StackNavigator />;
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      data => this.props.dispatch(
        setLocationAction(data.coords.latitude, data.coords.longitude))
    );
  }


  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  render() {
    return this.getNavigator();
  }
}

const mapStateToProps = state => {
  return {
    user: "5d619ec100ce9e044f1ba179"
  };
};

export default connect(mapStateToProps)(Navigator);
