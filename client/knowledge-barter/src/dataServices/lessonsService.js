import * as request from "./requester"
import * as multipartRequester from "./multipartFormDataRequester"

const baseUrl = 'https://localhost:3030'

const getAll = () => {
    return request.get(`${baseUrl}/lesson/all`)
}
const recommended = () => {
    return request.get(`${baseUrl}/lesson/recommended`)
}
const getPopular = () => {
    return request.get(`${baseUrl}/lesson/popular`)
}
const getDetails = (id) => {
    return request.get(`${baseUrl}/lesson/` + id)
}
const create = (data) => {
    return multipartRequester.post(`${baseUrl}/lesson/create`, data)
}
const update = (data, id) => {
    return multipartRequester.put(`${baseUrl}/lesson/` + id, data)
}
const del = (id) => {
    return request.del(`${baseUrl}/lesson/` + id)
}
const buy = (id) => {
    return request.get(`${baseUrl}/lesson/buy/` + id)
}
const like = (id) => {
    return request.get(`${baseUrl}/lesson/like/` + id)
}

export {
    getAll,
    recommended,
    getPopular,
    getDetails,
    create,
    update,
    del,
    buy,
    like
}