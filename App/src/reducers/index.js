import { combineReducers } from 'redux';
import userReducers from './userReducer';
import rfidReducers from './rfidReducer';
import configsReducers from './configsReducer';
import reservasReducers from './reservasReducer';


export default combineReducers({
    user: userReducers,
    rfid: rfidReducers,
    configs: configsReducers,
    reservationsDay: reservasReducers
});