import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import Svg, { Image, Circle, ClipPath } from 'react-native-svg'
import Ripple from 'react-native-material-ripple';
import theme from '../styles/theme';

const { height, width } = Dimensions.get('window'); //pega todo o tamanho da tela
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat } = Animated

import firebase from 'firebase';
import { newUser, processLogin } from '../actions';
import { connect } from 'react-redux';

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
    msg: ""
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class StartScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      isLoading: false
    }

    this.buttonOpacity = new Value(1);


    this.onStateChange = event([
      {
        nativeEvent: ({ state }) => block([
          cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
        ])
      }
    ]);

    this.buttonA = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgA = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 80, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) => block([
          cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
        ])
      }
    ]);
  }

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyBqdUPe_OjKXgg7_e9KjThFS7t4W9fIUCw",
      authDomain: "wwdb-e4fd3.firebaseapp.com",
      databaseURL: "https://wwdb-e4fd3.firebaseio.com",
      projectId: "wwdb-e4fd3",
      storageBucket: "wwdb-e4fd3.appspot.com",
      messagingSenderId: "113330992193",
      appId: "1:113330992193:web:5aaf22b06b01d7ab07c2c0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  getMessageByError(code) {
    switch (code) {
      case "auth/user-not-found":
        return "E-mail inexistente.";
      case "auth/wrong-password":
        return "Senha incorreta."
      default:
        return "Erro desconhecido.";
    }
  }

  processLogin = async () => {
    this.setState({
      isLoading: true
    });
    const { email, password } = this.state;

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await this.props.processLogin();
        if (this.props.user.isAdmin) {
          this.props.navigation.navigate('MyComponent');
        } else {
          this.props.navigation.navigate('HomeScreen');
        }
      })
      .catch(error => {

        if (error.code == 'auth/user-not-found') {
          Alert.alert(
            "Usuário não encontrado",
            "Desaja criar um novo usuário?",
            [{
              text: 'Não',
              onPress: () => { }
            },
            {
              text: 'Sim',
              onPress: async () => {
                await firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(async () => {
                    await this.props.newUser();
                    this.props.navigation.navigate('HomeScreen');
                  }
                  )
                  .catch(error => {
                    this.setState({
                      isLoading: false,
                      message: this.getMessageByError(error.code),
                    });
                  });
              }
            }],
            { cancelable: false }
          );
        } else {
          this.setState({
            isLoading: false,
            message: this.getMessageByError(error.code),
          });
        }
      })

    this.setState({
      isLoading: false
    });
  }

  onChangeHandler(field, valor) {
    this.setState({
      [field]: valor
    })
  }

  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator />;
    return (
      <Ripple
        onPress={() => this.processLogin()}>
        <Animated.View style={styles.button}>

          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>LOGAR</Text>

        </Animated.View>
      </Ripple>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}>

        <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgA }] }}>
          <Svg height={height + 50} width={width + 10}>
            <ClipPath id='clip'>
              <Circle r={height + 50}
                cx={(width + 10) / 2} />
            </ClipPath>
            <Image href={require('../../assets/bg.jpg')}
              height={height + 50} width={width + 10}
              preserveAspectRatio='xMidYMid slice'
              clipPath='url(#clip)' />
          </Svg>
        </Animated.View>

        <StatusBar
          barStyle='light-content'
          hidden={true}
        />

        <View style={{ height: height / 3 }}>

          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonA }] }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>LOGAR</Text>
            </Animated.View>
          </TapGestureHandler>

          <Animated.View style={{
            zIndex: this.textInputZindex,
            opacity: this.textInputOpacity,
            transform: [{ translateY: this.textInputY }],
            height: height / 3 + 30,
            ...StyleSheet.absoluteFill,
            top: null,
            justifyContent: 'center'
          }}>

            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text style={{
                  fontSize: 15,
                  transform: [{ rotate: concat(this.rotateCross, 'deg') }]
                }}>
                  X
              </Animated.Text>
              </Animated.View>
            </TapGestureHandler>

            <Text style={{
              margin: 20
            }}>{this.state.msg}</Text>
            <TextInput placeholder='E-mail'
              style={styles.textInput}
              placeholderTextColor='black'
              value={this.state.email}
              onChangeText={valor => {
                this.onChangeHandler('email', valor)
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput placeholder='Senha'
              style={styles.textInput}
              placeholderTextColor='black'
              secureTextEntry
              value={this.state.password}
              onChangeText={valor => {
                this.onChangeHandler('password', valor)
              }}
              autoCapitalize="none"
            />
            {this.renderButton()}
          </Animated.View>
        </View>

      </View >
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return { user };
}
export default connect(mapStateToProps, { newUser, processLogin })(StartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  button: {
    backgroundColor: theme.primaryColor,
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 4
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'black'
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 4
  }
});