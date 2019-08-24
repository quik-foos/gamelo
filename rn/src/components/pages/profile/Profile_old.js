import React, {Component} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {UserApi} from '../../../api';
import Button from '../../ui_elems/Button';
import {connect} from 'react-redux';
import {logoutAction} from '../../../actions';

class Profile extends Component {
  signout = async () => {
    try {
      await this.setState({loading: true});
      await UserApi.logout();
      await this.setState({loading: false});
      await this.props.dispatch(logoutAction());
    } catch (e) {
      await this.setState({loading: false});
      ToastAndroid.show(e.response.data.message, 'Sign out failed');
    }
  };

  render() {
    return (
      <View>
        <Text> THIS MY PAGE BOIII</Text>
        <View style={{height: 50}}>
          <Button text="Sign out" onPress={this.signout} />
        </View>
      </View>
    );
  }
}

export default connect()(Profile);
