
import React, { Component } from 'react';
import { View, Image, AsyncStorage, Dimensions } from 'react-native';
import { Container, Text, Card, CardItem, Content, Left, Body, Right, Spinner } from 'native-base';
//import MyHeader from './MyHeader'
type Props = {};
export default class Splash extends Component<Props> {
    state = { counter: 0, title: "news Single" }
    
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <Container style={{ alignContent: "center", justifyContent: "center" ,alignItems:"center" }} >

                <Image style={{ flex: 1, width:width,height:height }} source={require('./assets/Backgrounds/splash-bg.png')} />
                <Image source={require('./assets/Logo/khrogaty-logo.png')} style={{ width: 80, height: 80, borderRadius: 0 ,position:'absolute'}} />

                {this.moveToHome()}
            </Container>
        );
    }
    moveToHome() {
        AsyncStorage.getItem("once").then((value) => {

            setTimeout(() => {
                if (value === "yes") {
                    this.props.navigation.replace('Explore')
                } else {
                    this.props.navigation.replace('Slider')
                }
                // this.props.navigation.replace('Slider')
            }, 3000)
        })

    }
}

const { width, height } = Dimensions.get('window');