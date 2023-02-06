const request = async (method, url, data) => {
    try {
        const user = localStorage.getItem('auth');
        let auth = JSON.parse('{}');
        if (user !== 'undefined' && user) {
            auth = JSON.parse(user);
        }

        let headers = {}

        if (auth?.accessToken) {
            headers['Authorization'] = 'Bearer ' + auth.accessToken;
        }

        let beginningRequest;
        if (method === 'GET') {
            beginningRequest = fetch(url, { headers })
        }
        else if(method === "DELETE"){
            beginningRequest = fetch(url, {
                method,
                headers: {
                    ...headers
                },
            });
        }
        else {
            beginningRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        const response = await beginningRequest;
        let result = null;
        if (response.ok) {

            // If the response is empty
            try {
                result = await response.json();
            } catch (error) {
                result = null;
            }
        }
        else {
            const res = await response.json();
            throw new Error(res.title);
        }
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const get = request.bind({}, "GET")
export const post = request.bind({}, "POST")
export const put = request.bind({}, "PUT")
export const del = request.bind({}, "DELETE")
export const patch = request.bind({}, "PATCH")