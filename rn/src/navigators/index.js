import React, { Component } from 'react'
import SideNavigator from './side_navigation'
import BottomNavigator from './bottom_navigation'
import StackNavigator from './stack_navigation'
import Playground from './playground/playground'
import { connect } from 'react-redux'
import { setLocationAction } from '../actions'
import Geolocation from '@react-native-community/geolocation'

class Navigator extends Component {
  getNavigator() {
    // return this.props.user ? <BottomNavigator /> : <Playground />
    return this.props.user ? <BottomNavigator /> : <StackNavigator />
    // return this.props.user ? <StackNavigator /> : <BottomNavigator />
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(data => {
      this.props.dispatch(
        setLocationAction(data.coords.latitude, data.coords.longitude)
      )
    })
  }

  render() {
    return this.getNavigator()
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Navigator)
