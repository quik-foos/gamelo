import React, {  Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { BUTTON_COLOR } from '../../../constants';
import { connect } from 'react-redux';
import { UserApi, ResultApi } from '../../../api';
import { logoutAction } from '../../../actions';
import ButtonSmall from '../../../components/ui_elems/ButtonSmall'
import { ScrollView } from 'react-native-gesture-handler';
import MaterialTabs from 'react-native-material-tabs';

class Profile extends Component {

  state = { 
    firstName: "", 
    lastName: "", 
    username: "", 
    games: [], 
    email: "", 
    loading: false,
    view: "history",
    gameHistory: [],
    gameSummary: [{game: "Catan",played:112,elo:1600},{game: "Catan",played:214,elo:1640},{game: "Monopoly",played:42,elo:1200}]
  }



  async componentDidMount(){
    console.log(this.props.user)
    try{
      res = await UserApi.findOne({id: this.props.user})
      currentUser = res.data
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
    try {
      gameres = await ResultApi.findAll({player:this.props.user})
      console.log(gameres)
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

  displayHistory = () => {
    this.setState({
      view:"history"
    })
  }
  displaySummary = () => {
    this.setState({
      view:"summary"
    })
  }

  render() {
    const History = 
      (
      <View>
        <Text> Board Game Name </Text>
      </View>
      );
    const EloSummary = 
      (
      <View>
       {this.state.gameSummary.map((game, key)=>{
         return(
           <View key={key}>
             <Text>
              {game.game}  {game.played} 
              </Text>
              <Text>
              {game.elo}
             </Text>
           </View>
         )
       })}
      </View>
      );
  
   
    return (
      
        <ScrollView style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{`${this.state.firstName} ${this.state.lastName}`}</Text>
                <Text style={styles.info}>{this.state.username}</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                <View>
                  <ButtonSmall text="Game History" onPress={this.displayHistory}/> 
                  <ButtonSmall text="Game Summary" onPress={this.displaySummary}/> 
                </View>
                <ButtonSmall text="Sign Out" onPress={this.signout} /> 
                { this.state.view === "history" ? History : EloSummary}
              </View>
              </View>
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