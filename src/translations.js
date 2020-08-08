import i18next from 'i18next';

i18next
    .init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    layout: {
                        title: 'Pizza',
                    },
                    common: {
                        login: 'Sign in',
                    },
                    product: {
                        order: 'Order',
                    }
                }
            },
        }
    }, (err, t) => {
        if (err) return console.log('something went wrong loading', err);
        t('key'); // -> same as i18next.t
    });
export default i18next;