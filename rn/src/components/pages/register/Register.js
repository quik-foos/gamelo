import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Input from '../../ui_elems/Input';
import Button from '../../ui_elems/Button';
import {UserApi} from '../../../api';
import {loginAction} from '../../../actions';
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
    this.setState({loading: true})
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
      await this.setState({loading: false});
      await this.props.dispatch(loginAction(user));
    } catch (e) {
      await this.setState({loading: false});
      ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);
    }
  };

  getLoader = () => {
    if (this.state.loading)
      return (
        <View style={{marginTop: 50}}>
          <ActivityIndicator size="large" color={BUTTON_COLOR} />
        </View>
      )
  };

  render() {
    return (
      <View>
        <Text>
        </Text>
        <Input
          label="First Name"
          placeholder="First Name"
          value={this.state.firstName}
          secureTextEntry={false}
          onChangeText={firstName => this.setState({firstName})}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          value={this.state.lastName}
          secureTextEntry={false}
          onChangeText={lastName => this.setState({lastName})}
        />
        <Input
          label="Email"
          placeholder="user@mail.com"
          value={this.state.email}
          secureTextEntry={false}
          onChangeText={email => this.setState({email})}
        />
        <Input
          label="Username"
          placeholder="username"
          value={this.state.username}
          secureTextEntry={false}
          onChangeText={username => this.setState({username})}
        />
        <Input
          label="Password"
          placeholder="password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({password})}
        />
        <Text></Text>
        <View style={{height: 50}}>
          <Button text="Sign Up" onPress={this.signup} />
        </View>
        {this.getLoader()}
      </View>
    );
  }
}

export default connect()(Register);
