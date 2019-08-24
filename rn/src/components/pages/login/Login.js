import React, { Component } from 'react'
import { Text, View, TextInput, Alert } from 'react-native';
import Input from '../../ui_elems/Input';
import Button from '../../ui_elems/Button';

class Login extends Component {
    state = { firstName: "", lastName: "", email: "", password: "" }

    signup = () => {
        Alert.alert("Signed In!")
    }
    
    render(){
    return (
        <View>
            <Input
                label="Email"
                placeholder="user@mail.com"
                value={this.state.email}
                secureTextEntry={false}
                onChangeText={email => this.setState({ email })}
            />
            <Input
                label="Password"
                placeholder="password"
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
            />
            <Text>
                
            </Text>
            <View style={{ height:50 }}>
                <Button  text='Sign In' onPress={() => this.signup()} />
            </View>
        
        </View>
  );
};
}

export default Login;