const request = async (method, url, data) => {
    try{
        const user = localStorage.getItem('auth');
        let auth = JSON.parse('{}');
        if(user !== 'undefined' && user){
            auth = JSON.parse(user);
        }

        let headers = {}

        if (auth?.accessToken) {
            headers['X-Authorization'] = auth.accessToken;
        }

        let beginningRequest;
        if(method === 'GET'){
            beginningRequest = fetch(url,{ headers })
        }
        else{
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
        if(response.ok){ 
            result = await response.json();
        }
        else {
            const res = await response.json();
            throw new Error(res.message);
        }
        return result;
    }catch(err){
        throw new Error(err.message);
    }
}

export const get = request.bind({}, "GET")
export const post = request.bind({}, "POST")
export const put = request.bind({}, "PUT")
export const del = request.bind({}, "DELETE")
export const patch = request.bind({}, "PATCH")