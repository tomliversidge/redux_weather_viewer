import {FETCH_WEATHER} from '../actions/fetch_weather'
import {REMOVE_CITY} from '../actions/remove_city'
import _ from 'lodash'

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_WEATHER:
            // do not mutate state! The method below creates a new array (ES6 syntax)
            return [action.payload.data, ...state];// state.concat([action.payload.data]);
        case REMOVE_CITY:
            return _.filter(state, function (cityData) {
                return cityData.city.id !== action.payload;
            });
    }
    return state;
}
