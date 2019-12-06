import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import StartScreen from './screens/StartScreen';
import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen';
import TimesScreen from './screens/TimesScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import MyComponent from './screens/MyComponent';


import theme from './styles/theme';


const AppNavigator = createStackNavigator(
  {

    StartScreen: {
      screen: StartScreen,
      navigationOptions: {
        header: null
      }
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },

    CalendarScreen: {
      screen: CalendarScreen,
      navigationOptions: {
        headerTintColor: theme.secondaryColor,
        headerStyle: {
          backgroundColor: theme.primaryColor
        }
      }
    },

    UserDetailsScreen: {
      screen: UserDetailsScreen,
      navigationOptions: {
        header: null
      }
    },

    TimesScreen: {
      screen: TimesScreen,
      navigationOptions: {
        headerTintColor: theme.secondaryColor,
        headerStyle: {
          backgroundColor: theme.primaryColor
        }
      }
    },
    MyComponent: {
      screen: MyComponent,
      navigationOptions: {
        header: null
      }
    }
  }
);

export default Routes = createAppContainer(AppNavigator);