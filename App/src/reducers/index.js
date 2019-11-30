import { combineReducers } from 'redux';
import userReducers from './userReducer';
import rfidReducers from './rfidReducer';
import configsReducers from './configsReducer';


export default combineReducers({
    user: userReducers,
    rfid: rfidReducers,
    configs: configsReducers,
});