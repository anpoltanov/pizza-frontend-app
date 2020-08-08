import {combineReducers} from "redux";

export function error(state = null, action) {
    switch (action.type) {
        case 'LOGIN_LOGIN_ERROR':
            return action.error;
        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'LOGIN_LOGIN_LOADING':
            return action.loading;
        default:
            return state;
    }
}

export function user(state = null, action) {
    switch (action.type) {
        case 'LOGIN_LOGIN_SUCCESS':
            return action.user;
        case 'LOGIN_LOGOUT_SUCCESS':
            return action.user;
        default:
            return state;
    }
}

export function loggedIn(state = false, action) {
    switch (action.type) {
        case 'LOGIN_LOGIN_SUCCESS':
            return true;
        case 'LOGIN_LOGOUT_SUCCESS':
            return false;
        default:
            return state;
    }
}

export default combineReducers({error, loading, user, loggedIn});