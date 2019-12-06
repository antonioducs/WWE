import { combineReducers } from 'redux';
import userReducers from './userReducer';
import rfidReducers from './rfidReducer';
import configsReducers from './configsReducer';
import reservasReducers from './reservasReducer';
import usersListReducer from './userListReducer';
import rfidsListReducer from './rfidListReducer';

export default combineReducers({
    user: userReducers,
    rfid: rfidReducers,
    configs: configsReducers,
    reservationsDay: reservasReducers,
    usersList: usersListReducer,
    rfidsList: rfidsListReducer
});