import { combineReducers } from 'redux';

export function error(state = null, action) {
    switch (action.type) {
        case 'PRODUCT_LIST_ERROR':
            return action.error;

        case 'PRODUCT_LIST_RESET':
            return null;

        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'PRODUCT_LIST_LOADING':
            return action.loading;

        case 'PRODUCT_LIST_RESET':
            return false;

        default:
            return state;
    }
}

export function retrieved(state = null, action) {
    switch (action.type) {
        case 'PRODUCT_LIST_SUCCESS':
            return action.retrieved;

        case 'PRODUCT_LIST_RESET':
            return null;
            
        default:
            return state;
    }
}

export default combineReducers({ error, loading, retrieved });
