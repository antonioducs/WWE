import * as React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  StatusBar, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import Constants from 'expo-constants';
import CardUsers from '../components/CardUsers';
import { loadUserList } from '../actions';

import { connect } from 'react-redux';

class AdmUserScreen extends React.Component{
  
  async componentDidMount() {
    await this.props.loadUserList();
    console.log(this.props.usersList)
  }
  
  render () {
    return (
      <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content"/>

          <View style={styles.headerBar}>
              <Text style={{fontSize: 30,
                  color: 'white', 
                  alignItems: 'center', 
                  alignSelf: 'center', 
                  textAlign: 'center',
                  textAlignVertical: 'center'}}
              >
                  Usuários
              </Text>
          </View>
          <ScrollView>
            <View>
              {
                (this.props.usersList && this.props.usersList.length) ?
                this.props.usersList.map((item, key) => {
                  return( <View key={key.toString()}><CardUsers user = {item}/></View>);
                }): null
              }
            </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { usersList } = state;
  return { usersList };
}

const mapDispachToProps = {
  loadUserList
}

export default connect(mapStateToProps, mapDispachToProps)(AdmUserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  headerBar: {
    height: 42,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    alignContent: 'center',
    
  },
  item: {
    backgroundColor: '#4169E1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 130,
    borderRadius: 10,
    padding: 15,
    margin: 8,
    marginVertical: 4
  },
})