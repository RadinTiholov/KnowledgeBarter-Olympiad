import * as request from "./requester"
import * as multipartRequester from "./multipartFormDataRequester"

const baseUrl = 'https://localhost:3030'

const login = (data) => {
    return request.post(`${baseUrl}/identity/login`, data)
}
const register = (data) => {
    return multipartRequester.post(`${baseUrl}/identity/register`, data)
}
const getDetails = () => {
    return request.get(`${baseUrl}/identity/profile`)
}
export{
    login,
    register,
    getDetails
}