import React, { Component } from "react";
import { View, Image, Dimensions } from 'react-native';
import { Container, Card, CardItem, Content, Left, Body, Spinner, Button } from 'native-base';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,TouchableOpacity
} from "react-native";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';


export default class restaurants extends Component{
    state = { counter: 0, title: "About", data: [], loaded: 0 }

    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
            .then((response) => response.json())
            .then((resJson) => {
                this.setState({
                    data: resJson, loaded: 1
                }, function () {
                    console.log(resJson);
                });
            })
    }
render(){
    return(
        <Container>

<HeaderImageScrollView
      maxHeight={120}
      minHeight={5}
      headerImage={require("../assets/Backgrounds/theme-header.png")}
      renderForeground={() => (
        <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
          <TouchableOpacity onPress={() => console.log("tap!!")}>
       <Text textAlign='center' style={{fontSize:22,color:'white',fontWeight:'bold',right:120,marginLeft:5}}> Rest/Coffess</Text>      
    </TouchableOpacity>
        </View>
      )}
    >

        <Content>
            {this.returnData()}
        </Content>
        </HeaderImageScrollView>

    </Container>
    )
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
            this.state.data.map((mapingData) => {
                return (

                    <Card key={mapingData.id} style={{shadowOpacity:100,borderRadius:5}}>
                        <CardItem>
                            <Left style={{ flex: 2 }}>
                                <Image
                                    style={{ width: 120, height: 150, borderRadius: 10 }}
                                    source={{ uri: mapingData.better_featured_image.source_url }} />
                            </Left>
                            <Body style={{ flex: 3 }}>
                                <Text style={{ fontWeight: 'bold', color: '#000' }}>{mapingData.title.rendered}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Image source={require('../assets/Icons/map-marker.png')}
                                        style={{ width: 15, height: 15,marginRight:5 }} />
                                    <Text style={{ fontSize: 12, color: 'green' }}>{mapingData.acf.address}</Text>
                                </View>
                                <Text style={{ color: '#999', marginTop: 10 }}>{mapingData.excerpt.rendered}</Text>
                                <Button block success style={{width:100,height:30,marginTop:20}} onPress={()=>{
                                      this.props.navigation.navigate('router', {
                                        image: mapingData.better_featured_image.source_url,
                                        title: mapingData.title.rendered, id: mapingData.id, content: mapingData.content.rendered,
                                        address: mapingData.acf.address, telephone: mapingData.acf.phone_number,
                                        email: mapingData.acf.email_address,location:mapingData.acf.map_location
                                    })
                                }}>
                                    <Text style={{textAlign:'center',color:'white'}}>Details</Text>
                                    </Button>
                            </Body>
                        </CardItem>
                    </Card>
                        )
                    })
                )
    
            }
        }
}
