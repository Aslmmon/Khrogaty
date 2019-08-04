import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,TouchableOpacity,
    StatusBar,Image
} from "react-native";

type Props = {};
export default class Category extends Component<Props>{
render(){
    return(
        <View style={{ height: 100, width: 120,marginLeft:20,borderWidth:0.5,borderColor:'#dddddd' }} onPress={()=>{
            this.props.navigation.navigate('Details',{name:this.props.name});
        }} >
        <View style={{ flex: 2 }}>
            <Image source={{uri:this.props.imageUri}} style={{flex:1,width:null,height:null,resizeMode:'cover'}}/>
        </View>

        <View style={{ flex: 1 ,paddingLeft:10,paddingTop:10}}>
        <Text>{this.props.name}</Text>
        </View>

    </View>

    )
}
}
