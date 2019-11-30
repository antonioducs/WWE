import firebase from 'firebase';


export const LOAD_CONFIGS = 'LOAD_CONFIGS';
export const setConfigs = configs => ({
    type: LOAD_CONFIGS,
    configs
})

export const loadConfigs = () => {

    return async dispatch => {
        await firebase
        .database()
        .ref('configs')     
        .once('value')
        .then(function (snapshot) {
                dispatch(setConfigs(snapshot.val()));
        })
    }
}