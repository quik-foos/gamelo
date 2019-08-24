/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BackgroundImage from './src/components/BackgroundImage';


import Header from './src/components/Header';
import Button from './src/components/Button';

import RegisterForm from './src/components/RegisterForm';
import LoginForm from './src/components/LoginForm';


import { createStackNavigator, createAppContainer } from "react-navigation";


class HomeScreen extends Component {

  register = () => {
    Alert.alert('Registered!')
  }

  login = () => {
    Alert.alert('Logged In')
  }

  render(){
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header title="Gamelo" />
          <BackgroundImage />
          <View style={styles.body}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Button text='Register' onPress={() => this.props.navigation.navigate('Register')} />
            <Text></Text>
            <Text></Text>
            <Button text='Log In' onPress={() => this.props.navigation.navigate('Login')} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};
};

class RegisterScreen extends Component {
  render(){
    return(
      <RegisterForm />   
    )
  }
}

class LoginScreen extends Component {
  render(){
    return(
      <LoginForm />   
    )
  }
}


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: "Register Form"
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Login Form"
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}