import React, { Component, Fragment } from 'react';
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
import BackgroundImage from './BackgroundImage';
import Header from '../../Header';
import Button from '../../ui_elems/Button';


class Home extends Component {

    register = () => {
      Alert.alert('Registered!')
    }
  
    login = () => {
      Alert.alert('Logged In')
    }
  
    render() {
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
    }
}

export default Home;

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
