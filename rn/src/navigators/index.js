import React, { Component } from 'react';
import SideNavigator from './side_navigation';
import BottomNavigator from './bottom_navigation';
import StackNavigator from './stack_navigation';
import { connect } from 'react-redux';
import { setLocationAction } from '../actions';
import Geolocation from '@react-native-community/geolocation';
import Map from '../components/ui_elems/Map'

class Navigator extends Component {
  getNavigator() {
    return this.props.user ? <BottomNavigator /> : <StackNavigator />;
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      data => {
        this.props.dispatch(
          setLocationAction(data.coords.latitude, data.coords.longitude))
      }
    );
  }

  render() {
    return this.getNavigator();
  }
}

const mapStateToProps = state => {
  return {
    user: null
  };
};

export default connect(mapStateToProps)(Navigator);
