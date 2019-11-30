import {
    LOAD_CONFIGS,
} from '../actions';


export default function configsReducers(state = null, action)
{
    switch(action.type)
    {
        case LOAD_CONFIGS:
            return action.configs;
            
        default:
            return state;
    }
}