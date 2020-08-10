import { combineReducers } from 'redux';

export function currencyCode(state = 'USD', action) {
    switch (action.type) {
        case 'LAYOUT_CURRENCY_CODE':
            return action.code;

        case 'LAYOUT_CURRENCY_CODE_RESET':
            return 'USD';

        default:
            return state;
    }
}

export function currencyIcon(state = '$', action) {
    switch (action.type) {
        case 'LAYOUT_CURRENCY_ICON':
            return action.icon;

        case 'LAYOUT_CURRENCY_ICON_RESET':
            return '$';

        default:
            return state;
    }
}

export default combineReducers({ currencyCode, currencyIcon });
