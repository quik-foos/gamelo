import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import Home from './components/pages/home/Home.js';
import Register from './components/pages/register/Register.js';
import Login from './components/pages/login/Login.js';


const BottomAppNavigator = createMaterialTopTabNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          header: null
        }
      },
      Register: {
        screen: Register,
        navigationOptions: {
          title: "Register"
        }
      },
      Login: {
        screen: Login,
        navigationOptions: {
          title: "Login"
        }
      }
    },
    {
      initialRouteName: "Home",
      tabBarPosition: 'bottom',
      tabBarOptions: {
        style: {
          backgroundColor: '#f2f2f2',
          borderTopWidth: 0.5,
          borderTopColor: 'grey'
        },
        activeTintColor: 'orange',
        inactiveTintColor: 'grey',
        showIcon: true,
      }
    }
);

export default AppContainer = createAppContainer(BottomAppNavigator);