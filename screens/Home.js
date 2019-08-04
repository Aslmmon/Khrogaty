import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image, TouchableOpacity
} from "react-native";
import Category from './Components/Category';
import { Container, Content, Spinner ,Header} from "native-base";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';



class Home extends Component {
    static navigationOptions = {
        header: null,
    };

    state = { data: [], loaded: 0, restaurants: [], things: [] }

    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=4")
            .then((response) => response.json())
            .then((resJson) => {
                this.setState({
                    data: resJson, loaded: 1
                });
            }).then(() => {
                fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
                    .then((response) => response.json())
                    .then((resJson) => {
                        this.setState({
                            restaurants: resJson, loaded: 1
                        }, function () {
                            console.log(resJson);
                        });
                    }).then(() => {
                        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=2")
                            .then((response) => response.json())
                            .then((resJson) => {
                                this.setState({
                                    things: resJson, loaded: 1
                                }, function () {
                                    console.log(resJson);
                                })
                            })
                    })

            })
    }
    
    render() {
        return (


            <HeaderImageScrollView
            maxHeight={200}
            minHeight={10}
            headerImage={require("../assets/Backgrounds/home-header.png")}
            renderForeground={() => (
              <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
                <TouchableOpacity onPress={() => console.log("tap!!")}>
                <Image source={require('../assets/Logo/khrogaty-logo.png')} style={{ width: 100, height: 100, marginLeft: 10 }} />
                </TouchableOpacity>
              </View>
            )}
          >
            <Container>
                <ScrollView scrollEventThrottle={16}>
                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../assets/VectorIcons/home-first-icon.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
                            <Text style={{ fontSize: 20, fontWeight: '700', paddingHorizontal: 20 }}>Places For Going Out </Text>
                            <Text style={{ fontSize: 14, fontWeight: '700', paddingHorizontal: 20, paddingTop: 5, color: 'green' }}>View More</Text>
                        </View>
                        <View style={{ height: 130, marginTop: 20 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {this.returnDataPlaces()}
                            </ScrollView>
                        </View>
                    </View>

                </ScrollView>
                <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.2,
                }}
              />
                <ScrollView scrollEventThrottle={16}>

                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../assets/VectorIcons/home-second-icon.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
                            <Text style={{ fontSize: 20, fontWeight: '700', paddingHorizontal: 20 }}>Restaurants $ Coffee Shops </Text>
                            <Text style={{ fontSize: 14, fontWeight: '700', paddingHorizontal: 20, paddingTop: 5, color: 'green' }}>View More</Text>
                        </View>
                        <View style={{ height: 130, marginTop: 20 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {this.returnRestaurants()}
                            </ScrollView>
                        </View>
                    </View>

                </ScrollView>
                <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.2,
                }}
              />
                <ScrollView scrollEventThrottle={16}>

                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Image source={require('../assets/VectorIcons/home-third-icon.png')} style={{ flex: 0.3, width: 30, height: 30, marginLeft: 10 }} />
                            <Text style={{ fontSize: 20, fontWeight: '700', paddingHorizontal: 20, flex: 2 }}>What Do I DO? </Text>
                            <Text style={{ fontSize: 14, fontWeight: '700', paddingHorizontal: 20, paddingTop: 5, color: 'green', flex: 1 }}>View More</Text>
                        </View>
                        <View style={{ height: 130, marginTop: 20 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {this.returnThings()}
                            </ScrollView>
                        </View>
                    </View>

                </ScrollView>

            </Container>
            </HeaderImageScrollView>



        )
    }

    returnDataPlaces() {
        if (this.state.loaded === 0) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner />
                    <Text>Loading</Text>
                </View>
            )
        } else {
            return (
                this.state.data.map((mappingData) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('router', {
                                image: mappingData.better_featured_image.source_url,
                                title: mappingData.title.rendered, id: mappingData.id, content: mappingData.content.rendered,
                                address: mappingData.acf.address, telephone: mappingData.acf.phone_number,
                                email: mappingData.acf.email_address,location:mappingData.acf.map_location
                            })
                        }}>
                            <Category imageUri={mappingData.better_featured_image.source_url}
                                name={mappingData.title.rendered} />

                        </TouchableOpacity>
                    )

                })
            )
        }

    }


    returnRestaurants() {
        if (this.state.loaded === 0) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner />
                    <Text>Loading</Text>
                </View>
            )
        } else {
            return (
                this.state.restaurants.map((mappingData) => {
                    return (

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('router', {
                                image: mappingData.better_featured_image.source_url,
                                title: mappingData.title.rendered, id: mappingData.id, content: mappingData.content.rendered,
                                address: mappingData.acf.address, telephone: mappingData.acf.phone_number,
                                email: mappingData.acf.email_address,location:mappingData.acf.map_location
                            })
                        }}>
                        <Category imageUri={mappingData.better_featured_image.source_url}
                            name={mappingData.title.rendered} />

                            </TouchableOpacity>
                    )

                })
            )
        }

    }


    returnThings() {
        if (this.state.loaded === 0) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner />
                    <Text>Loading</Text>
                </View>
            )
        } else {
            return (
                this.state.things.map((mappingData) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('router', {
                                image: mappingData.better_featured_image.source_url,
                                title: mappingData.title.rendered, id: mappingData.id, content: mappingData.content.rendered,
                                address: mappingData.acf.address, telephone: mappingData.acf.phone_number,
                                email: mappingData.acf.email_address,location:mappingData.acf.map_location
                            })
                        }}>
                        <Category imageUri={mappingData.better_featured_image.source_url}
                            name={mappingData.title.rendered} />
                            </TouchableOpacity>
                    )

                })
            )
        }

    }

}
export default Home;