
import React from 'react';
import { StyleSheet, AsyncStorage, Dimensions, ImageBackground, Image, Text } from 'react-native';
import About from './About.js'
import Map from './Map.js'


import { createMaterialTopTabNavigator } from "react-navigation";

const AppNavigator  = createMaterialTopTabNavigator({
    About: About,
    Map: Map,
},{defaultNavigationOptions:{
    header:null
}},{
    tabBarOptions:{
        activeTintColor:'black',
        inactiveTintColor:'gray',
        showIcon:'true',
        style:{
            backgroundColor:'white'
        }
    },
   
});

export default AppNavigator;