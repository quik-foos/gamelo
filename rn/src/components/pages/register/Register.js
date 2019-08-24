import React, { Component } from 'react'
import { Text, View, TextInput, Alert } from 'react-native';
import Input from '../../ui_elems/Input';
import Button from '../../ui_elems/Button';

class Register extends Component {
    state = { firstName: "", lastName: "", email: "", username: "", password: "" }

    signup = () => {
        Alert.alert("Signed Up!")
    }
    
    render(){
    return (
        <View>
            <Input
                label="First Name"
                placeholder="First Name"
                value={this.state.firstName}
                secureTextEntry={false}
                onChangeText={firstName => this.setState({ firstName })}
            />
            <Input
                label="Last Name"
                placeholder="Last Name"
                value={this.state.lastName}
                secureTextEntry={false}
                onChangeText={lastName => this.setState({ lastName })}
            />
            <Input
                label="Email"
                placeholder="user@mail.com"
                value={this.state.email}
                secureTextEntry={false}
                onChangeText={email => this.setState({ email })}
            />
            <Input
                label="Username"
                placeholder="username"
                value={this.state.username}
                secureTextEntry={false}
                onChangeText={username => this.setState({ username })}
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
                <Button  text='Sign Up' onPress={() => this.signup()} />
            </View>
            
            {/* <View style={{ height:50 }}>
                <Button text='Go Back' onPress={() => { this.props.navigation.navigate('Home')}} />
            </View> */}
        
        </View>
  );
};
}

export default Register;