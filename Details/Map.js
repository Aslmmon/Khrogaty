import React, { Component } from "react";
 

 
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,Linking,WebView
} from "react-native";

class Map extends Component {

  
    render() {
        return (
          
       
           <WebView source={{uri:this.props.navigation.getParam('location')}}/>
        )
    }

}


export default Map;