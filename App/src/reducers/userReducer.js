import { 
  USER_LOGIN_SUCESS, 
  USER_LOGOUT, 
  SET_FIELD_USER,
  SAVE_USER_SUCESS
} from '../actions';


export default function userReducers(state = null, action) {
  switch (action.type) {
    case USER_LOGIN_SUCESS:
      return action.user;
    case SET_FIELD_USER:
      const clonedState = { ...state };
      clonedState[action.field] = action.value;
      return clonedState;
    case SAVE_USER_SUCESS:
      return action.user;
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
} 