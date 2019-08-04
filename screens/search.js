import React, { Component } from "react";
import {
    View, Image,
    Text,
    StyleSheet,
    ListView,
    Alert, ActivityIndicator,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar, TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Container } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';


class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
        }
        this.arrayholder = [];
    }

    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?")
            .then((response) => response.json())
            .then((resJson) => {
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(resJson),
                }, function () {
                    this.arrayholder = resJson;
                });
            })
            // }).then(() => {
            //     fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=2")
            //         .then((response) => response.json())
            //         .then((resJson) => {
            //             let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
            //             this.setState({
            //                 isLoading: false,
            //                 dataSource: ds.cloneWithRows(resJson)
            //             }, function () {
            //                 this.arrayholder = resJson;
            //             })
            //         })
            // }).then(() => {
            //     fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
            //         .then((response) => response.json())
            //         .then((resJson) => {
            //             let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
            //             this.setState({
            //                 isLoading: false,
            //                 dataSource: ds.cloneWithRows(resJson)
            //             }, function () {
            //                 this.arrayholder = resJson;
            //             })
            //         })
            // })
            .catch((error) => {
                console.log(error);
            });
    }

    GetListViewItem(title_renderd) {

        Alert.alert(title_renderd);

    }


    SearchFilterFunction(text) {

        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.title.rendered.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }


    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                   <View style={{ flex: 1 }}>
                        <View style={{ height: 55, width: 400, top: 70, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'white' }}>
                            <View style={{
                                flexDirection: 'row', padding: 10,
                                backgroundColor: 'white', marginHorizontal: 20,
                                shadowColor: 'black',
                                borderRadius: 5,
                                shadowOpacity: 0.2,
                                elevation: 5,

                            }}>

                                <Icon name="ios-search" size={25} style={{ marginRight: 10 }} />
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    placeholder="Search here by place"
                                    placeholderTextColor="grey"
                                    style={{ flex: 1, fontWeight: '200', fontSize: 12, backgroundColor: 'white' }}
                                />
                            </View>
                        </View>

                        <View>
                            <Image source={require('./nosearch-icon.png')} style={{ width: 80, height: 80, top: 200, left: 150 }} />
                            <Text style={{ top: 210, left: 120 }}>Search For Any places </Text>
                        </View>
                    </View> 
                    <ActivityIndicator />
                </View>
            );
        }


        return (

            <HeaderImageScrollView
                maxHeight={120}
                minHeight={5}
                headerImage={require("../assets/Backgrounds/theme-header.png")}
                renderForeground={() => (
                    <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
                        <TouchableOpacity onPress={() => console.log("tap!!")}>
                            <Text textAlign='center' style={{ fontSize: 22, color: 'white', fontWeight: 'bold', right: 120 }}> Search </Text>
                        </TouchableOpacity>
                    </View>
                )}
            >

                <Container style={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>

                  





                    <View style={styles.MainContainer}>

                        <TextInput
                            style={styles.TextInputStyleClass}
                            onChangeText={(text) => this.SearchFilterFunction(text)}
                            value={this.state.text}
                            underlineColorAndroid='transparent'
                            placeholder="Search Here"
                        />

                        <ListView

                            dataSource={this.state.dataSource}

                            renderSeparator={this.ListViewItemSeparator}

                            renderRow={(rowData) => <Text style={styles.rowViewContainer}

                                onPress={this.GetListViewItem.bind(this, rowData.title.rendered)} >{rowData.title.rendered}</Text>}

                            enableEmptySections={true}

                            style={{ marginTop: 10 }}

                        />

                    </View>



                </Container>
            </HeaderImageScrollView>

        )
    }
    
}

const styles = StyleSheet.create({
    MainContainer :{
     justifyContent: 'center',
     flex:1,
     margin: 7,
    
     },

    rowViewContainer: {
      fontSize: 17,
      padding: 10
     },
   
     TextInputStyleClass:{
           
      textAlign: 'center',
      height: 40,
      borderWidth: 1,
      borderColor: '#009688',
      borderRadius: 7 ,
      backgroundColor : "#FFFFFF"
           
      }
    
   });
export default search;
