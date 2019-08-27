import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Logo from './Logo';
import Header from '../../ui_elems/Header';
import Button from '../../ui_elems/Button';
import ButtonSmall from '../../ui_elems/ButtonSmall';
import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../../constants';

class Home extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <Logo />
        <View style={styles.spacer} />
        <Button
          text="Register"
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}
        />
        <Button
          text="Log in"
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
    
  },
  bodyContent: {
    alignItems: 'center',
    padding:10,
  },
  buttonStyle: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:225,
    borderRadius:30,
    backgroundColor: BUTTON_COLOR,
  },
  spacer: {
    height: 60,
  },
});
