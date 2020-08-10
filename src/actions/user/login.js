import { fetch } from '../../utils/dataAccess';

export function error(error) {
    return { type: 'USER_LOGIN_ERROR', error };
}

export function loading(loading) {
    return { type: 'USER_LOGIN_LOADING', loading };
}

export function success(user) {
    return { type: 'USER_LOGIN_SUCCESS', user };
}

export function logoutSuccess(user) {
    return { type: 'USER_LOGOUT_SUCCESS', user };
}

export function login(values) {
    return dispatch => {
        dispatch(loading(true));

        return fetch('login', { method: 'POST', body: JSON.stringify(values) })
            .then(response => {
                dispatch(loading(false));

                return response.json();
            })
            .then(retrieved => {
                if (retrieved.authToken) {
                    localStorage.setItem('auth_token', retrieved.authToken);
                }
                dispatch(success(retrieved));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}

export function fetchUser() {
    return dispatch => {
        dispatch(loading(true));

        return fetchUserWithMethod(dispatch);
    };
}

function fetchUserWithMethod(dispatch, method = 'GET') {
    return fetch('user', { method: method })
        .then(response => {
            dispatch(loading(false));
            return response.json();
        })
        .then(retrieved => {
            if (retrieved && retrieved.authToken) {
                localStorage.setItem('auth_token', retrieved.authToken);
                localStorage.setItem('user_name', retrieved.name);
            } else if (method === 'GET') {
                fetchUserWithMethod(dispatch,'POST');
            }
            dispatch(success(retrieved));
        })
        .catch(e => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_name');
            dispatch(loading(false));
        });
}

export function logout() {
    return dispatch => {
        dispatch(loading(true));

        return fetch('logout', { method: 'GET' })
            .then(response => {
                dispatch(loading(false));

                return response.json();
            })
            .then(retrieved => {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_name');
                dispatch(logoutSuccess(retrieved || {}));
            })
            .catch(e => {
                dispatch(loading(false));
            });
    };
}