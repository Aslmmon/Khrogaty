import React, { Component } from "react";
import {
    View,
    Text,
    Image, Dimensions,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
} from "react-native";
import { Icon, Card, CardItem, Body, Left, Form, Item } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';


export default class About extends Component {
    state = { addCommentRes: [], comment: "", addingComment: 0, comments: [] , name: "Anonymous", commentAdded: ""}



    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/comments?post=" + this.props.navigation.getParam('id'))
            .then((response) => response.json())
            .then((resJson) => {
                this.setState({
                    comments: resJson, loaded: 1
                }, function () {
                    console.log(resJson);
                });
            })
        // alert(Dimensions.get('window').width + " - " + Dimensions.get('window').height);
    }
    render() {
        return (
            <View>
                
                <ScrollView>
                    <Image source={{ uri: this.props.navigation.getParam('image') }}
                        style={{ width: Dimensions.width, height: 150 }} />
                    <View>
                        <Card style={{ margin: 5, shadowOpacity: 50 }}>
                            <CardItem>
                                <Body>
                                    <Text style={{ fontSize: 22, fontFamily: 'bold', color: 'black' }}>{this.props.navigation.getParam('title')}</Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Text>{this.props.navigation.getParam('content')}</Text>
                            </CardItem>

                        </Card>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20, marginLeft: 10 }}>More Information</Text>
                    </View>
                    <Card style={{ shadowOpacity: 50 }}>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Image source={require('../assets/Icons/map-marker.png')} style={{ width: 25, height: 25, marginLeft: 5 }} />
                            <Text style={{ marginLeft: 10 }}>{this.props.navigation.getParam('address')}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Image source={require('../assets/Icons/call.png')} style={{ width: 25, height: 25, marginLeft: 5 }} />
                            <Text style={{ marginLeft: 10 }}>{this.props.navigation.getParam('telephone')}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Image source={require('../assets/Icons/mail.png')} style={{ width: 25, height: 25, marginLeft: 5 }} />
                            <Text style={{ marginLeft: 10 }}>{this.props.navigation.getParam('email')}</Text>
                        </View>
                    </Card>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>Leave a Comment</Text>
                    </View>

                    {this.returnData()}

                    {/* Comment bar  */}

                    <View style={styles.container}>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={{ flex: 1 }}
                                placeholder="Write Your comment here .. ."
                                underlineColorAndroid="transparent"
                                onChangeText={(commentAdded) => this.setState({commentAdded})}
                                value={this.state.commentAdded}
                            />
                           {this.commentButton()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    commentButton(){
        if(this.state.addingComment ===0){
            return(
                <TouchableOpacity onPress={()=>{
                    this.addComment();
                    this.setState({addingComment:1})
                }}>
                <Image
                    //We are showing the Image from online
                    source={require('../assets/Icons/telegram.png')}
                    style={styles.ImageStyle}
                />
                </TouchableOpacity>
            )
        }else{
            return(
                <Image
                //We are showing the Image from online
                source={require('../assets/Icons/telegram.png')}
                style={styles.ImageStyle}
                
            />
            
            )
        }

    }

addComment(){
    fetch('http://reactnative.website/iti/wp-json/wp/v2/comments?author_name=Aslm &author_email=itialex39@roqay.com.kw&content='+ this.state.commentAdded +'&post='+ this.props.navigation.getParam('id'), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res)=> res.json())
        .then((rj)=>{
            this.setState({addCommentRes: rj, addingComment: 0, name: "", commentAdded: ""}, function(){
                console.log(rj);
                this.componentDidMount();
            })
        })
}


    returnData() {
        if (this.state.loaded === 0) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner />
                    <Text>Loading</Text>
                </View>
            )
        } else {
            return (
                this.state.comments.map((mapingData) => {
                    return (

                        <Card>
                            <CardItem>
                                <Left style={{ flex: 0.5 }}>
                                    <Image
                                        style={{ width: 35, height: 35, borderRadius: 10 }}
                                        source={require('../assets/Icons/profile.png')} />
                                </Left>
                                <Body style={{ flex: 3 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={{ fontWeight: 'bold', color: '#000', marginRight: 5 }}>{mapingData.author_name}</Text>
                                        <Text style={{ fontSize: 12, color: 'green', padding: 5 }}>{mapingData.date}</Text>
                                    </View>
                                    <Text style={{ color: '#999', marginTop: 10 }}>{mapingData.content.rendered}</Text>

                                </Body>
                            </CardItem>
                        </Card>
                    )
                })
            )

        }
    }
}

About.navigationOptions = {
    tabBarIcon: ({ tintColor, focused }) => (
        <Icon
            name={focused ? 'ios-planet' : 'md-planet'}
            size={28}
            color={'green'}
        />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10,
    },

    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
});