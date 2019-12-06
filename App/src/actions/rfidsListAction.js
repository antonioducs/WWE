import firebase from 'firebase';

export const LOAD_RFIDS_LIST = 'LOAD_RFIDS_LIST';
export const setRfidsList = rfids => ({
    type: LOAD_RFIDS_LIST,
    rfids
})

export const loadRfidList = () => {
    console.log("Entrou")
    const array = []
    return async dispatch => {
        await firebase
        .database()
        .ref('rfid')
        .once('value', function(snapshot) {
            let data = snapshot.val();
            Object.keys(data).map(function (key) {
                array.push({...data[key], id:key});
            });
        })
        dispatch(setRfidsList(array));
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