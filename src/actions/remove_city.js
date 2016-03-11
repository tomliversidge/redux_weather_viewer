export const REMOVE_CITY = 'REMOVE_CITY';

export function removeCity(cityId) {
    return {
        type: REMOVE_CITY,
        payload: cityId // payload key is 'magic' - middlewares look at this property
    };
}