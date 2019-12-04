import {
    LOAD_RESERVATIONS_DAY,
} from "../actions";


export default function reservasReducers(state = null, action) {
    switch (action.type) {
        case LOAD_RESERVATIONS_DAY:
            return action.reservations;
        default:
            return state;
    }
}