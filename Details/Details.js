import React ,{ Component } from 'react';
import { StyleSheet, AsyncStorage, Dimensions, ImageBackground, Image, View, Text } from 'react-native';


import { createAppContainer } from 'react-navigation'
import AppNavigator from './router.js'


const AppIndex = createAppContainer(AppNavigator)

export default class Details extends Component {
    render() {
        return (
            <View style={{flex:1}}>
            
                <AppIndex />
            </View>
        )
    }
}