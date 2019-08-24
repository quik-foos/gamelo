import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { BUTTON_COLOR } from '../../../constants';
import { connect } from 'react-redux';
import { UserApi } from '../../../api';
import { logoutAction } from '../../../actions';
import ButtonSmall from '../../../components/ui_elems/ButtonSmall'
import Explore from '../../../components/pages/explore/Explore'
import { ScrollView } from 'react-native-gesture-handler';

class Profile extends Component {

  state = { 
    firstName: "", 
    lastName: "", 
    username: "", 
    games: [], 
    email: "", 
    loading: false 
  }
  async componentDidMount(){
    console.log("I am here")
    console.log(this.props.user)
    try{
      res = await UserApi.findOne({id: this.props.user})
      console.log(res)
      currentUser = res.data
      console.log(currentUser)
      if(currentUser) this.setState( { 
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        username: currentUser.username,
        email: currentUser.email 
      })
    } catch(e){
      console.log(e.response)
      ToastAndroid.show("Something went wrong. Please check your internet connection", ToastAndroid.SHORT)
    }
  }

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
        <ScrollView style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{`${this.state.firstName} ${this.state.lastName}`}</Text>
                <Text style={styles.info}>{this.state.username}</Text>
                {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text> */}
                <ButtonSmall text="Sign Out" onPress={this.signout} /> 
              </View>
          </View>
          <Explore />
        </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: BUTTON_COLOR,
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: "5d619ec100ce9e044f1ba179"
  }
}

export default connect(mapStateToProps)(Profile)