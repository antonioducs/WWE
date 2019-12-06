import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../config/constants';
import { FAB } from 'react-native-paper';

import theme from '../styles/theme';

import UserDetails from '../components/UserDetails';
import ListAtividades from '../components/ListAtividades';


const SUGGESTED_HEIGHT = SCREEN_HEIGHT / 3;

export default class HomeScreen extends Component {


  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View>
          <UserDetails navigation={this.props.navigation} />
        </View>
        <ScrollView>
          <View style={styles.tabsContainer}>
            <ListAtividades />
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          bigger
          icon="add"
          onPress={() => this.props.navigation.navigate('CalendarScreen')}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.secondaryColor
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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.primaryColor,
  },
});
