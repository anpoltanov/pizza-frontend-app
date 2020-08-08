import { ENTRYPOINT } from '../config/entrypoint';

const MIME_TYPE = 'application/json';

export function fetch(id, options = {}) {
    if ('undefined' === typeof options.headers) {
        options.headers = new Headers();
    }
    if (null === options.headers.get('Accept')) {
        options.headers.set('Accept', MIME_TYPE);
    }

    if (
        'undefined' !== options.body &&
        !(options.body instanceof FormData) &&
        null === options.headers.get('Content-Type')
    ) {
        options.headers.set('Content-Type', MIME_TYPE);
    }
    if (localStorage.api_token) {
        options.headers.set('X-Auth-Token', localStorage.api_token);
    }

    return global.fetch(new URL(id, ENTRYPOINT), options).then(response => {
        if (response.ok) {
            return response;
        }

        return response.json().then(
            json => {
                const error =
                    json['error'] ||
                    'An error occurred.';
                if (!json.violations) {
                    throw Error(error);
                }

                let errors = { _error: error };
                json.violations.forEach(violation =>
                    errors[violation.propertyPath]
                        ? (errors[violation.propertyPath] +=
                        '\n' + errors[violation.propertyPath])
                        : (errors[violation.propertyPath] = violation.message)
                );

                throw new Error(errors.toString());
            },
            () => {
                throw new Error(response.statusText || 'An error occurred.');
            }
        );
    });
}

export function normalize(data) {
    if (Array.isArray(data)) {
        data = data.map(item => normalize(item));
        return {"data": data};
    }
    return data;
}
