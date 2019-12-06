import {
    LOAD_USERS_LIST
} from '../actions';

export default function usersListReducers(state = [], action) {
    switch (action.type) {
        case LOAD_USERS_LIST:
            return action.users;
        default:
            return state;
    }
}