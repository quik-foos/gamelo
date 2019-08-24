import { createStackNavigator, 
         createAppContainer } from "react-navigation";
import Home from './components/pages/home/Home.js';
import Register from './components/pages/register/Register.js';
import Login from './components/pages/login/Login.js';


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
      }
    },
    {
      initialRouteName: "Home"
    }
);

export default AppContainer = createAppContainer(AppNavigator);