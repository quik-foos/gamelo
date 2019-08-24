/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Navigator from './src/navigators';
import GlobalFont from 'react-native-global-font';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import axiosMiddleware from 'redux-axios-middleware';
import reducers from './src/reducers';
import server from './src/api/server';

const store = createStore(reducers, applyMiddleware(axiosMiddleware(server)));

class App extends Component {
  componentDidMount() {
    GlobalFont.applyGlobal('Rubik-Medium');
  }

  render() {
    return <Provider store={store}><Navigator /></Provider>;
  }
}

export default App;
