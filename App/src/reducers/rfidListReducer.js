import {
    LOAD_RFIDS_LIST,
    SET_NEW_RFID
} from '../actions';

export default function rfidsListReducers(state = [], action) {
    switch (action.type) {
        case LOAD_RFIDS_LIST:
            return action.rfids;
        case SET_NEW_RFID:
            let clonedState = state;
            if(clonedState != null){
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
        default:
            return state;
    }
}