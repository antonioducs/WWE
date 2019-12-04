import {
    SET_RFID, CLEAR_RFID,
} from '../actions';

export default function rfidReducers(state = null, action) {
    switch (action.type) {
        case SET_RFID:
            return action.value;
        case CLEAR_RFID:
            return null;
        default:
            return state;
    }
}