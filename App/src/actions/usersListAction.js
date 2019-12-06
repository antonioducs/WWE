import firebase from 'firebase';

export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const setUsersList = users => ({
    type: LOAD_USERS_LIST,
    users
})

export const loadUserList = () => {
    console.log("Entrou")
    const array = [];
    return async dispatch => {
        await firebase
        .database()
        .ref('users')
        .once('value', function (snapshot) {
            let data = snapshot.val();
            Object.keys(data).map(function (key) {
                array.push(data[key]);
            });
        });
        dispatch(setUsersList(array));
    }
}