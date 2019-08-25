import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import {
  Text, 
  View, 
  TextInput, 
  Alert, 
  ToastAndroid,
  ActivityIndicator} from 'react-native';
import { Input } from 'react-native-elements';
// import Input from '../../ui_elems/Input';
import Button from '../../ui_elems/Button';
import {connect} from 'react-redux';
import {UserApi, TableApi} from '../../../api';
import {loginAction} from '../../../actions';
import { BUTTON_COLOR } from '../../../constants';


class Login extends Component {
  state = {username: '', password: '', loading: false};

  login = async () => {
    let res = await TableApi.findAll({ host: "5d618db4ec27cd02bd95d261" })
    let tables = await res.data
    console.log(tables)
    try {
      await this.setState({loading: true});
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
        <Fumi
        label={'Username'}
        iconClass={FontAwesomeIcon}
        iconName={'user'}
        iconColor={'#005756'}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        onChangeText={username => this.setState({username})}
      />
      <Fumi
        label={'Password'}
        iconClass={FontAwesomeIcon}
        iconName={'lock'}
        iconColor={'#005756'}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        secureTextEntry={true}
        onChangeText={password => this.setState({password})}
      />
        <Text />
        <View style={{height: 50}}>
          <Button text="Sign In" onPress={this.login} />
        </View>
        {this.getLoader()}
      </View>
    );
  }
}

export default connect()(Login);
