import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import Ripple from 'react-native-material-ripple';


class ChangeNameScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {hasFocus: true};
}
  setFocus (hasFocus) {
  this.setState({hasFocus});
  }

  render(){
    }
  
  

  }

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2b2f33',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonSalCan: {
    height: 30,
    width: '70%',
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: 'black',
  }  
});
