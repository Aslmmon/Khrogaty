

import Splash from './Splash';
import Slider from './Slider'
import Explore from './Explore'
import About from './Details/About'
import router from './Details/router'
import Details from './Details/Details'


import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  Splash: Splash,
   Slider: Slider,
   Explore:Explore,
  router:router,
  Details:Details,
  
  // MyWebView:MyWebView
},{
  defaultNavigationOptions:{
    header:null
  },
});

export default createAppContainer(AppNavigator);