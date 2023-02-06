const multipartFormDataRequester = async (method, url, data) => {
    try {
        const user = localStorage.getItem('auth');
        let auth = JSON.parse('{}');

        if (user !== 'undefined' && user) {
            auth = JSON.parse(user);
        }

        let beginningRequest;
        if (auth?.accessToken) {
            beginningRequest = fetch(url, {
                method,
                headers: {
                    Authorization: 'Bearer ' + auth.accessToken
                },
                body: data,
            })
        }
        else {
            beginningRequest = fetch(url, {
                method,
                body: data,
            })
        }

        const response = await beginningRequest;
        let result = null;
        if (response.ok) {
            result = await response.json();
        } else {
            const res = await response.json();
            let errorMessages = createErrorMessage(res);
            throw new Error(errorMessages);
        }
        
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createErrorMessage = (errors) => {
    let result = '';
    for (let i = 0; i < errors.length; i++) {
        result += errors[0].description + '\n';
    }
    return result;
};
export const post = multipartFormDataRequester.bind({}, 'POST');
export const put = multipartFormDataRequester.bind({}, 'PUT');