import {
    fetch,
    normalize
} from '../../utils/dataAccess';

export function error(error) {
    return { type: 'ORDER_LIST_ERROR', error };
}

export function loading(loading) {
    return { type: 'ORDER_LIST_LOADING', loading };
}

export function success(retrieved) {
    return { type: 'ORDER_LIST_SUCCESS', retrieved };
}

export function list(id) {
    return dispatch => {
        dispatch(loading(true));
        dispatch(error(''));

        fetch(id)
            .then(response =>
                response
                    .json()
                    .then(retrieved => ({ retrieved }))
            )
            .then(({ retrieved }) => {
                retrieved = normalize(retrieved);
                dispatch(loading(false));
                dispatch(success(retrieved));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}