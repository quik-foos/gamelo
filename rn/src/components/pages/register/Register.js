import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  StatusBar,
  Alert,
  ToastAndroid,
} from 'react-native';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import { Fumi } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import Input from '../../ui_elems/Input';
import Button from '../../ui_elems/Button';
import { UserApi } from '../../../api';
import { loginAction } from '../../../actions';
import { BUTTON_COLOR } from '../../../constants';


class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    loading: false,
  };

  signup = async () => {
    this.setState({ loading: true })
    try {
      await UserApi.create({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      });
      let res = await UserApi.login({
        username: this.state.username,
        password: this.state.password,
      });
      let user = await res.data.user._id
      await this.setState({ loading: false });
      await this.props.dispatch(loginAction(user));
    } catch (e) {
      await this.setState({ loading: false });
      ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);
    }
  };

  getLoader = () => {
    if (this.state.loading)
      return (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="large" color={BUTTON_COLOR} />
        </View>
      )
  };

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#055" barStyle="light-content" />
        <Text>
        </Text>
        <Fumi
          label={'First Name'}
          iconClass={FontAwesomeIcon5}
          iconName={'dice-one'}
          iconColor={'#005756'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          onChangeText={firstName => this.setState({ firstName })}
        />

        <Fumi
          label={'Last Name'}
          iconClass={FontAwesomeIcon5}
          iconName={'dice-two'}
          iconColor={'#005756'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          onChangeText={lastName => this.setState({ lastName })}
        />
        <Fumi
          label={'Email'}
          iconClass={FontAwesomeIcon5}
          iconName={'dice-three'}
          iconColor={'#005756'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          onChangeText={email => this.setState({ email })}
        />
        <Fumi
          label={'Username'}
          iconClass={FontAwesomeIcon5}
          iconName={'dice-four'}
          iconColor={'#005756'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          onChangeText={username => this.setState({ username })}
        />
        <Fumi
          label={'Password'}
          iconClass={FontAwesomeIcon5}
          iconName={'dice-five'}
          iconColor={'#005756'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <Text></Text>
        <View style={{ height: 50 }}>
          <Button text="Sign Up" onPress={this.signup} />
        </View>
        {this.getLoader()}
      </View>
    );
  }
}

export default connect()(Register);
