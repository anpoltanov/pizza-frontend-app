import { fetch } from '../../utils/dataAccess';

export function error(error) {
    return { type: 'ORDER_CART_DELETE_ERROR', error };
}

export function loading(loading) {
    return { type: 'ORDER_CART_DELETE_LOADING', loading };
}

export function success(deleted) {
    return { type: 'ORDER_CART_DELETE_SUCCESS', deleted };
}

export function del(item, path) {
    return dispatch => {
        dispatch(loading(true));
        return fetch(path, { method: 'DELETE' })
            .then(() => {
                dispatch(loading(false));
                dispatch(success(item));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}
