import i18next from 'i18next';

i18next
    .init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    layout: {
                        title: 'Pizza',
                        menuProducts: 'Menu',
                        menuProductsPizza: 'Pizza',
                        menuProductsSnacks: 'Snacks',
                        menuProductsDrinks: 'Drinks',
                        menuProfile: 'Profile',
                        menuProfileLogout: 'Logout',
                        menuProfileLogin: 'Sign in',
                        menuProfileOrders: 'Orders history',
                        menuOrderCart: 'Cart',
                        currencyEUR: '€ EUR',
                        currencyUSD: '$ USD',
                    },
                    common: {
                        login: 'Sign in',
                        loginUsername: 'E-mail',
                        loginPassword: 'Password',
                        loginSubmit: 'Sign In',
                        submit: 'Submit',
                    },
                    product: {
                        order: 'Add to cart',
                    },
                    order: {
                        cart: 'Cart',
                        placeOrder: 'Place order',
                        cartIsEmpty: 'Cart is empty',
                        deliveryAddress: 'Delivery address',
                        comment: 'Comment',
                        reset: 'Reset',
                        placed: 'Your order was successfully sent to us and we are already preparing it!'
                    }
                }
            },
        }
    }, (err, t) => {
        if (err) return console.log('something went wrong loading', err);
        t('key'); // -> same as i18next.t
    });
export default i18next;