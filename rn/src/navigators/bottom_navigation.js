import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'

import { View, Text } from 'react-native'
import React from 'react'
import Explore from '../components/pages/explore/Explore.js'
import Table from '../components/pages/table/Table.js'
import JoinTable from '../components/pages/table/JoinTable'
import CreateTable1 from '../components/pages/table/CreateTable1'
import CreateTable2 from '../components/pages/table/CreateTable2'
import CreateTable3 from '../components/pages/table/CreateTable3'
import CreateTable4 from '../components/pages/table/CreateTable4'
import Profile from '../components/pages/profile/Profile.js'
import Icon from 'react-native-vector-icons/Ionicons'
import { BUTTON_COLOR } from '../constants.js'

const BottomAppNavigator = createMaterialTopTabNavigator(
  {
    Explore: {
      screen: Explore,
      navigationOptions: {
        title: 'Explore',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-search" color={tintColor} size={24} />
        )
      }
    },
    Table: {
      screen: Table,
      navigationOptions: {
        title: 'My Table',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="logo-game-controller-b" color={tintColor} size={24} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'My Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contact" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: 'Explore',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: '#f2f2f2',
        borderTopWidth: 0.5,
        borderTopColor: 'grey'
      },
      activeTintColor: '#066',
      inactiveTintColor: 'grey',
      showIcon: true
    }
  }
)

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: BottomAppNavigator,
      navigationOptions: {
        header: null
      }
    },
    JoinTable: {
      screen: JoinTable,
      navigationOptions: {
        title: 'Table'
      }
    },
    CreateTable1: {
      screen: CreateTable1,
      navigationOptions: {
        headerBackground: (
          <View
            style={{ flex: 1, width: '25%', backgroundColor: 'lightgray' }}
          ></View>
        ),
        title: '1/4'
      }
    },
    CreateTable2: {
      screen: CreateTable2,
      navigationOptions: {
        headerBackground: (
          <View
            style={{ flex: 1, width: '50%', backgroundColor: 'lightgray' }}
          ></View>
        ),
        title: '2/4'
      }
    },
    CreateTable3: {
      screen: CreateTable3,
      navigationOptions: {
        headerBackground: (
          <View
            style={{ flex: 1, width: '75%', backgroundColor: 'lightgray' }}
          ></View>
        ),
        title: '3/4'
      }
    },
    CreateTable4: {
      screen: CreateTable4,
      navigationOptions: {
        headerBackground: (
          <View
            style={{ flex: 1, backgroundColor: 'lightgray' }}
          ></View>
        ),
        title: '4/4'
      }
    }
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTintColor: BUTTON_COLOR,
      headerBackImage: ({ tintColor }) => (
        <Icon
          name="ios-arrow-back"
          style={{ padding: 10 }}
          color={BUTTON_COLOR}
          size={24}
        />
      )
    }
  }
)

export default AppContainer = createAppContainer(StackNavigator)
