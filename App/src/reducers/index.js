import { combineReducers } from 'redux';
import userReducers from './userReducer';
import rfidReducers from './rfidReducer';


//retorna um state e uma action
export default combineReducers({
    user: userReducers,
    rfid: rfidReducers
});