import * as request from "./requester"

const baseUrl = 'https://localhost:3030'

const login = (data) => {
    return request.post(`${baseUrl}/identity/login`, data)
}
const register = (data) => {
    return request.post(`${baseUrl}/identity/register`, data)
}
const getDetails = (id) => {
    return request.get(`${baseUrl}/identity/profile` + id)
}
export{
    login,
    register,
    getDetails
}