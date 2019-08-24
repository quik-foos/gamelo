import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BackgroundImage from './BackgroundImage';
import Logo from './Logo';
import Header from '../../ui_elems/Header';
import Button from '../../ui_elems/Button';
import ButtonSmall from '../../ui_elems/ButtonSmall';
import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../../constants';

class Home extends Component {
  render() {
    return (
      <View style={styles.mainView}>
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
  spacer: {
    height: 60,
  },
});
