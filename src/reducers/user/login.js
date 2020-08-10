import {combineReducers} from "redux";

export function error(state = null, action) {
    switch (action.type) {
        case 'USER_LOGIN_ERROR':
            return action.error;
        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'USER_LOGIN_LOADING':
            return action.loading;
        default:
            return state;
    }
}

export function user(state = null, action) {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            return action.user;
        case 'USER_LOGOUT_SUCCESS':
            return action.user;
        default:
            return state;
    }
}

export function loggedIn(state = false, action) {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            return Array.isArray(action.user.roles) && action.user.roles.includes('ROLE_REGISTERED_USER');
        case 'USER_LOGOUT_SUCCESS':
            return false;
        default:
            return state;
    }
}

export default combineReducers({error, loading, user, loggedIn});