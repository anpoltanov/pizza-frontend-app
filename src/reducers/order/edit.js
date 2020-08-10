import { combineReducers } from 'redux';
import {retrieveError, retrieveLoading} from "./cart";

export function updateError(state = null, action) {
    switch (action.type) {
        case 'ORDER_EDIT_UPDATE_ERROR':
            return action.updateError;

        case 'ORDER_EDIT_RESET':
            return null;

        default:
            return state;
    }
}

export function updateLoading(state = false, action) {
    switch (action.type) {
        case 'ORDER_EDIT_UPDATE_LOADING':
            return action.updateLoading;

        case 'ORDER_EDIT_RESET':
            return false;

        default:
            return state;
    }
}

export function updated(state = null, action) {
    switch (action.type) {
        case 'ORDER_EDIT_UPDATE_SUCCESS':
            return action.updated;

        case 'ORDER_EDIT_RESET':
            return null;

        default:
            return state;
    }
}

export function retrieved(state = null, action) {
    switch (action.type) {
        case 'ORDER_CART_RETRIEVE_SUCCESS':
            return action.retrieved;

        case 'ORDER_CART_RESET':
            return null;

        default:
            return state;
    }
}

export default combineReducers({
    retrieved, retrieveError, retrieveLoading,
    updateError,
    updateLoading,
    updated,
});
