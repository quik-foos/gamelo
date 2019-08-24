/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppContainer from './src/navigation';
import GlobalFont from 'react-native-global-font';

export default class App extends Component {
  componentDidMount() {
    GlobalFont.applyGlobal('Rubik-Medium');
  }
  render() {
    return <AppContainer />;
  }
}