import firebase from 'firebase';


export const SET_RFID = 'SET_RFID';
export const setRfid = value => ({
    type: SET_RFID,
    value
});

export const CLEAR_RFID = 'CLEAR_RFID0';
export const clearRfid = () => ({
    type: CLEAR_RFID
});

export const loadRfid = rfid => {
    return async dispatch => {
        await firebase
            .database()
            .ref(`rfid/${rfid}`)
            .once('value')
            .then(function (snapshot) {
                dispatch(setRfid(snapshot.val()));
            })
    }
}

export const saveNewUserRfid = (rfid, value, name) => {
    const { currentUser } = firebase.auth();

    const cloneValue = value;
    cloneValue.userid = currentUser.uid;
    clonedValue.name = name;

    return async dispatch => {
        await firebase
            .database()
            .ref(`rfid/${rfid}`)
            .set(cloneValue)

        dispatch(clearRfid());
    }
}


const SET_NEW_RFID = 'SET_NEW_RFID';
const dispatchSetNewRfid = (rfid, apt) => ({
    type: SET_NEW_RFID,
    rfid,
    apt
});
export const setNewRfid = (rfid, apt) => {

    const data = {
        apt: apt,
        name: "",
        userid: ""
    }

    return async dispatch => {
        await firebase
        .database()
        .ref(`rfid/${rfid}`)
        .set(data);

        dispatch(dispatchSetNewRfid(rfid, apt));
    }
}