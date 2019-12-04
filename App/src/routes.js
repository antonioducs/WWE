import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import StartScreen from './screens/StartScreen';
import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen';
import TimesScreen from './screens/TimesScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';

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
    UserDetailsScreen: {
      screen: UserDetailsScreen,
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
    TimesScreen: {
      screen: TimesScreen,
      navigationOptions: {
        headerTintColor: theme.secondaryColor,
        headerStyle: {
          backgroundColor: theme.primaryColor
        }
      }
    }
  }
);

export default Routes = createAppContainer(AppNavigator);