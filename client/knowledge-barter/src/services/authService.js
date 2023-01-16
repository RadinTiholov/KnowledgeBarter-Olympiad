import * as request from "./requester"
const baseUrl = 'http://localhost:3030'

const login = (data) => {
    return request.post(`${baseUrl}/identity/login`, data)
}
const register = (data) => {
    return request.post(`${baseUrl}/identity/register`, data)
}
const logout = () => {
    return request.get(`${baseUrl}/auth/logout`)
}
const getDetails = (id) => {
    return request.get(`${baseUrl}/identity/profile` + id)
}
export{
    login,
    register,
    logout,
    getDetails
}