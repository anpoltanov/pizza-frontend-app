export function currencyCode(code) {
    return { type: 'LAYOUT_CURRENCY_CODE', code };
}

export function currencyIcon(icon) {
    return { type: 'LAYOUT_CURRENCY_ICON', icon };
}

export function switchCurrency(targetCode) {
    return dispatch => {
        let code, icon;
        switch (targetCode) {
            case 'EUR':
                code = 'EUR';
                icon = '€';
                break;
            case 'USD':
            default:
                code = 'USD';
                icon = '$';
        }
        dispatch(currencyCode(code));
        dispatch(currencyIcon(icon));
    };
}
