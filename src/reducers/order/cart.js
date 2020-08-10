import { combineReducers } from 'redux';

export function retrieveError(state = null, action) {
    switch (action.type) {
        case 'ORDER_CART_RETRIEVE_ERROR':
            return action.retrieveError;

        case 'ORDER_CART_RESET':
            return null;

        default:
            return state;
    }
}

export function retrieveLoading(state = false, action) {
    switch (action.type) {
        case 'ORDER_CART_RETRIEVE_LOADING':
            return action.retrieveLoading;

        case 'ORDER_CART_RESET':
            return false;

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

        case 'ORDER_CART_ADD_ITEM_SUCCESS':
            let newState = Object.assign({orderItems: []}, state);
            newState.orderItems.push(action.item);
            return newState;

        default:
            return state;
    }
}

export default combineReducers({
    retrieveError,
    retrieveLoading,
    retrieved,
});
