import React, {Component} from 'react';
import {Text, View, TextInput, Alert, ToastAndroid} from 'react-native';
import Input from '../../ui_elems/Input';
import Button from '../../ui_elems/Button';
import {connect} from 'react-redux';
import {UserApi} from '../../../api';
import {loginAction} from '../../../actions';

class Login extends Component {
  state = {username: '', password: ''};

  login = async () => {
    try {
      await UserApi.login({
        username: this.state.username,
        password: this.state.password,
      });
      await this.setState({loading: false});
      await this.props.dispatch(loginAction(this.state.username));
    } catch (e) {
      await this.setState({loading: false});
      ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View>
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
        <Text />
        <View style={{height: 50}}>
          <Button text="Sign In" onPress={this.login} />
        </View>
      </View>
    );
  }
}

export default connect()(Login);
