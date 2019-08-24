import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './components/pages/home/Home.js';
import Register from './components/pages/register/Register.js';
import Login from './components/pages/login/Login.js';
import Explore from './components/pages/explore/Explore.js';
import Table from './components/pages/table/Table.js';

const AppNavigator = createStackNavigator(
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
      },
      Explore: {
        screen: Explore,
        navigationOptions: {
          title: "Explore"
        }
      },
      Table: {
        screen: Table,
        navigationOptions:{
          title: "Join Table"
        }
      }
    },
    {
      initialRouteName: "Home"
    }
);

export default AppContainer = createAppContainer(AppNavigator);