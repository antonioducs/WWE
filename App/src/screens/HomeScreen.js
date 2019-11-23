import React, { useState }  from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Header } from 'react-navigation-stack';
import { SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../config/constants';

import theme from '../styles/theme';


import HeaderHome from '../components/HeaderUser';
import UserDetails from '../components/UserDetails';
import ListAtividades from '../components/ListAtividades';

const SUGGESTED_HEIGHT = SCREEN_HEIGHT / 3.5;
const HIDE_HEIGHT = SUGGESTED_HEIGHT + Header.HEIGHT;

export default function HomeScreen({ navigation }) {
  const [scrollY] = useState(new Animated.Value(0));

  const translateY = scrollY.interpolate({
    inputRange: [0, HIDE_HEIGHT + 80],
    outputRange: [0, -HIDE_HEIGHT],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.safeArea}>
     <Animated.View
                    style={{translateY}}
                >
        <View>
          <View style={styles.header}>
            <HeaderHome navigation={navigation}/>
          </View>
          <UserDetails />
        </View>
        <View style={styles.tabsContainer}>
            <ListAtividades scrollY={scrollY}/>
        </View>
      </Animated.View>
    </View>
  );
}




const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.backgroundGray
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 130,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    margin: 8,
    marginVertical: 4
  },
  tabsContainer: {
    height: SCREEN_HEIGHT - Header.HEIGHT - STATUSBAR_HEIGHT
  },
  header: {
    height: Header.HEIGHT,
    marginTop: STATUSBAR_HEIGHT
  }
});
