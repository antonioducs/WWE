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

export const saveNewUserRfid = (rfid, apt, name) => {
    const { currentUser } = firebase.auth();

    const data = {
        name: name,
        userid: currentUser.uid,
        apt: apt
    }

    return async dispatch => {
        await firebase
            .database()
            .ref(`rfid/${rfid}`)
            .set(data)

        dispatch(clearRfid());
    }
}