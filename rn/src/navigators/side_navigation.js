import {createAppContainer, createDrawerNavigator} from 'react-navigation';
import Home from '../components/pages/home/Home.js';
import Register from '../components/pages/register/Register.js';
import Login from '../components/pages/login/Login.js';
import Explore from '../components/pages/explore/Explore.js';
import Table from '../components/pages/table/Table.js';

const SideAppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Register: {
      screen: Register,
    },
    Login: {
      screen: Login,
    },
    Explore: {
      screen: Explore,
    },
    Table: {
      screen: Table,
    },
  },
  {
    drawerType: 'slide',
    drawerWidth: 200,
  },
);

export default AppContainer = createAppContainer(SideAppNavigator);
