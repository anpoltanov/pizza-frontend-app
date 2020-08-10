import {
    fetch,
    normalize,
} from '../../utils/dataAccess';

export function updateError(updateError) {
    return { type: 'ORDER_EDIT_UPDATE_ERROR', updateError };
}

export function updateLoading(updateLoading) {
    return { type: 'ORDER_EDIT_UPDATE_LOADING', updateLoading };
}

export function updateSuccess(updated) {
    return { type: 'ORDER_EDIT_UPDATE_SUCCESS', updated };
}

export function update(id, values) {
    return dispatch => {
        dispatch(updateError(null));
        dispatch(updateLoading(true));

        return fetch(id, {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(values)
        })
            .then(response =>
                response
                    .json()
                    .then(retrieved => ({ retrieved }))
            )
            .then(({ retrieved }) => {
                retrieved = normalize(retrieved);
                dispatch(updateLoading(false));
                dispatch(updateSuccess(retrieved));
                dispatch({ type: 'ORDER_CART_RESET' });
            })
            .catch(e => {
                dispatch(updateLoading(false));
                dispatch(updateError(e.message));
            });
    };
}

export function reset() {
    return dispatch => {
        dispatch({ type: 'ORDER_EDIT_RESET' });
    };
}