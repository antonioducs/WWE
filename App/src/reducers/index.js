import { combineReducers } from 'redux';
import userReducers from './userReducer';


//retorna um state e uma action
export default combineReducers({
    user: userReducers
});