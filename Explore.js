import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation';
import Home from './screens/Home'
import findplaces from './screens/findPlaces'
import restaurants from './screens/restaurants'
import search from './screens/search'
import thingsToDo from './screens/thingsToDo'
import { View, Text } from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons'

class Explore extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        );
    }
}

export default createBottomTabNavigator({

    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
            headerBackground:(  <Image
                style={{width:50,height:50}}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
              />
            ),
            headerTitleStyle: { color: '#fff' },
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/Icons/home.png')} style={{ width: 24, height: 24, tintColor: tintColor }} />
            )
        }
    }, search: {
        screen: search,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/Icons/gfilter.png')} style={{ width: 24, height: 24, tintColor: tintColor }} />
            )
        }
    }, findplaces: {
        screen: findplaces,
        navigationOptions: {
            tabBarLabel: 'Find Places',
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/Icons/gfind-places.png')} style={{ width: 24, height: 24, tintColor: tintColor }} />
                //   <Icon name="ios-search-outline" color={tintColor} size={24} />
            )
        }
    }, restaurants: {
        screen: restaurants,
        navigationOptions: {
            tabBarLabel: 'Restuarants',
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/Icons/grestaurants.png')} style={{ width: 24, height: 24, tintColor: tintColor }} />
                //   <Icon name="ios-search-outline" color={tintColor} size={24} />
            )
        }
    }, thingsToDo: {
        screen: thingsToDo,
        navigationOptions: {
            tabBarLabel: 'Things To Do',
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/Icons/gtodo.png')} style={{ width: 24, height: 24, tintColor: tintColor }} />
                //   <Icon name="ios-search-outline" color={tintColor} size={24} />
            )
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: 'Green',
            inactiveTintColor: 'black',
            style: {
                backgroundColor: 'white',
                borderTopWidth: 0,
                shadowOffset: { width: 5, height: 3 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 5

            }
        },
    });