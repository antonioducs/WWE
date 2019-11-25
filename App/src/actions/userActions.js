import firebase from 'firebase';
import { Alert } from 'react-native';

export const USER_LOGIN_SUCESS = 'USER_LOGIN';
const userLoginSucess = user => ({
  type: USER_LOGIN_SUCESS,
  user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
  type: USER_LOGOUT,
})


export const processLogin = () => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    await firebase
      .database()
      .ref(`users/${currentUser.uid}`)
      .once('value')
      .then(function(snapshot) {
        dispatch(userLoginSucess(snapshot.val()));
      })
  
  }
}

export const newUser = () => {

  const { currentUser } = firebase.auth();

  const user = {
    name: "",
    photo: "",
    apt: "",
    rfid: "",
    horarios: Array(null),
    isAdmin: false
  }

  return async dispatch => {
    await firebase
      .database()
      .ref(`users/${currentUser.uid}`)
      .set(user);

    dispatch(userLoginSucess(user));
  }
}