import {FETCH_WEATHER} from '../actions/index'
export default function(state = [], action){
    switch (action.type) {
        case FETCH_WEATHER:
            // do not mutate state! The method below creates a new array (ES6 syntax)
            return [ action.payload.data, ...state];// state.concat([action.payload.data]);
    }
    return state;
}
