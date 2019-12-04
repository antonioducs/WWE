import {
    SET_RFID, CLEAR_RFID,
    SET_NEW_RFID
} from '../actions';

export default function rfidReducers(state = null, action) {
    switch (action.type) {
        case SET_RFID:
            return action.value;
        case SET_NEW_RFID:
            let clonedState = state;
            if (clonedState != null) {
                clonedState.push({
                    id: action.rfid,
                    apt: action.apt,
                    name: "",
                    userid: ""
                });
            }else{
                clonedState = [{
                    id: action.rfid,
                    apt: action.apt,
                    name: "",
                    userid: ""
                }];
            }
            return clonedState;

        case CLEAR_RFID:
            return null;
        default:
            return state;
    }
}