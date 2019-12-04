import firebase from 'firebase';
import { Alert } from 'react-native';

export const LOAD_RESERVATIONS_DAY = 'LOAD_RESERVATIONS_DAY';
export const dispatchLoadReservationsDay = reservations => ({
    type: LOAD_RESERVATIONS_DAY,
    reservations
});

export const loadReservationsDay = day => {
    return dispatch => {
        firebase
            .database()
            .ref(`reservas/"${day}"`)
            .on('value', snapshot => {
                dispatch(dispatchLoadReservationsDay(snapshot.val()));
            })
    }
}


export const setNewReservationDay = async (day, time, user) => {

    const { currentUser } = firebase.auth();

    const userRes = {
        apt: user.apt,
        name: user.name,
        photo: user.photo,
        userid: currentUser.uid
    }

    await firebase
        .database()
        .ref(`reservas/"${day}"/"${time}"`)
        .set(userRes)
}

export const deleteReservationDay = async (day, time) => {
    await firebase
        .database()
        .ref(`/reservas/"${day}"/"${time}"`)
        .remove();
}