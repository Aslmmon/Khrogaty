import React from 'react';
import { StyleSheet, AsyncStorage, Dimensions, ImageBackground, Image, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  }
});
const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Places for Going out',
    image: require('./assets/Backgrounds/onboarding-bg-left.png'),
    image2: require('./assets/VectorIcons/home-first-icon.png'),
    imageStyle: styles.image,
    backgroundColor: 'red',
    text2: 'Lorem Ipsum is simply dummy text '
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Restaurants & Coffee Shops',
    image: require('./assets/Backgrounds/onboarding-bg-right.png'),
    image2: require('./assets/VectorIcons/home-second-icon.png'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
    text2: 'Lorem Ipsum is simply dummy text  '
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'What do I do',
    image: require('./assets/Backgrounds/onboarding-bg-left.png'),
    image2: require('./assets/VectorIcons/home-third-icon.png'),
    text: "What Do I Do?",
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
    buttonCircle: 'true',
    text2: 'Lorem Ipsum is simply dummy text  '
  }
];

export default class Slider extends React.Component {

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="chevron-right"
          size={24}
          color="white"
        />
      </View>
    );
  }

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="check"
          size={24}
          color="white"
        />
      </View>
    );
  }

  _renderItem = props => (
    <Container style={{ alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: 'gray' }}>
      {/* <Image source={requ2ire('./assets/Logo/khrogaty-logo.png')} style={{ width: 60, height: 60, borderRadius: 200 ,position:'absolute'}} /> */}
      <ImageBackground style={{ resizeMode: 'stretch', flex: 1, width: width, height: height }} source={props.image} ></ImageBackground>
      <Image style={{ width: 50, height: 50, top: height / 1.5, left: width / 2.5, position: 'absolute' }} source={props.image2} />
      <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', bottom: 100, }}>{props.text}</Text>
      <Text style={{ fontSize: 12, color: 'black', bottom: 100 }}>{props.text2}</Text>

    </Container>

  );
  _onDone = () => {
     this.saveData()
    this.props.navigation.replace('Explore')
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}
        renderNextButton={this._renderNextButton}
        renderDoneButton={this._renderDoneButton}

      />
    );
  }
  saveData() {
    AsyncStorage.setItem("once", "yes")
  }
}

const { width, height } = Dimensions.get('window');