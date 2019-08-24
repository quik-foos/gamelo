import { createAppContainer, 
  createMaterialTopTabNavigator } from "react-navigation";

import React from 'react';
import Explore from '../components/pages/explore/Explore.js';
import Table from '../components/pages/table/Table.js';
import Profile from '../components/pages/profile/Profile.js';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomAppNavigator = createMaterialTopTabNavigator(
{
Explore: {
 screen: Explore,
 navigationOptions: {
   title: "Explore",
   tabBarIcon: ({ tintColor }) => (
     <Icon name="md-search" color={tintColor} size={24} />
   )
 }
},
Table: {
 screen: Table,  
 navigationOptions:{
   title: "My Table",
   tabBarIcon: ({ tintColor }) => (
     <Icon name="logo-game-controller-b" color={tintColor} size={24} />
   )
 }
},
Profile: {
 screen: Profile,
 navigationOptions:{
   title: "My Profile",
   tabBarIcon: ({ tintColor }) => (
     <Icon name="ios-contact" color={tintColor} size={24} />
   )
 }
}
},
{
initialRouteName: "Explore",
tabBarPosition: 'bottom',
tabBarOptions: {
 labelStyle: {
   fontSize: 12,
 },
 style: {
   backgroundColor: '#f2f2f2',
   borderTopWidth: 0.5,
   borderTopColor: 'grey'
 },
 activeTintColor: '#066',
 inactiveTintColor: 'grey',
 showIcon: true,
}
}
);

export default AppContainer = createAppContainer(BottomAppNavigator);