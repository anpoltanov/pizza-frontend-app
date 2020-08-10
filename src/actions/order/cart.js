import {
    fetch,
    normalize,
} from '../../utils/dataAccess';
import { loading, error } from './delete';

export function retrieveError(retrieveError) {
    return { type: 'ORDER_CART_RETRIEVE_ERROR', retrieveError };
}

export function retrieveLoading(retrieveLoading) {
    return { type: 'ORDER_CART_RETRIEVE_LOADING', retrieveLoading };
}

export function retrieveSuccess(retrieved) {
    return { type: 'ORDER_CART_RETRIEVE_SUCCESS', retrieved };
}

export function retrieve(id) {
    return dispatch => {
        dispatch(retrieveLoading(true));

        return fetch(id)
            .then(response =>
                response
                    .json()
                    .then(retrieved => ({ retrieved }))
            )
            .then(({ retrieved }) => {
                retrieved = normalize(retrieved);
                dispatch(retrieveLoading(false));
                dispatch(retrieveSuccess(retrieved));
            })
            .catch(e => {
                dispatch(retrieveLoading(false));
                dispatch(retrieveError(e.message));
            });
    };
}

export function create(userId, values) {
    return dispatch => {
        dispatch(retrieveError(null));
        // dispatch(createSuccess(null));
        dispatch(retrieveLoading(true));

        return fetch(`/users/${userId}/orders`, {
            method: 'POST',
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
                if (Array.isArray(values.items) && values.items.length > 0) {
                    values.items.map(item => dispatch(addItemSuccess(item)));
                }
                dispatch(retrieveLoading(false));
                dispatch(retrieveSuccess(retrieved));
            })
            .catch(e => {
                dispatch(retrieveLoading(false));
                dispatch(retrieveError(e.message));
            });
    };
}

export function addItemSuccess(item) {
    return { type: 'ORDER_CART_ADD_ITEM_SUCCESS', item };
}

export function addItemError(error) {
    return { type: 'ORDER_CART_ADD_ITEM_ERROR', error };
}

export function addItem(item, amount = 1) {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.user.login.user) {
            dispatch(retrieveError('User is not authenticated'));
            return Promise.resolve();
        }
        if (!state.order.cart.retrieved) {
            return dispatch(create(state.user.login.user.id, {orderItems: [{amount: amount, product: item}]}));
        } else {
            dispatch(retrieveError(null));
            dispatch(retrieveLoading(true));
            return fetch(`/users/${state.user.login.user.id}/orders/${state.order.cart.retrieved.id}/items`, {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({amount: amount, product: item})
            })
                .then(response =>
                    response
                        .json()
                        .then(retrieved => ({ retrieved }))
                )
                .then(({ retrieved }) => {
                    retrieved = normalize(retrieved);
                    dispatch(addItemSuccess(retrieved));
                    dispatch(retrieveLoading(false));
                })
                .catch(e => {
                    dispatch(retrieveLoading(false));
                    dispatch(retrieveError(e.message));
                });
        }
    }
}

export function reset() {
    return dispatch => {
        dispatch({ type: 'ORDER_CART_RESET' });
        dispatch(error(null));
        dispatch(loading(false));
        // dispatch(createSuccess(null));
    };
}
