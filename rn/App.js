/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppContainer from './src/stack_navigation';
import BottomAppContainer from './src/bottom_navigation';
import SideAppNavigator from './src/side_navigation';
import GlobalFont from 'react-native-global-font';

export default class App extends Component {
  state = { loggedIn: true }

  componentDidMount() {
    GlobalFont.applyGlobal('Rubik-Medium');
  }

  updateLogin(newLogin) {
    this.setState({ loggedIn: newLogin })
  }

  renderNavigator = () => {
    if(this.state.loggedIn){
      return <BottomAppContainer />
    }
    return <AppContainer />
  }

  render() {
    return this.renderNavigator()
  }
}