import * as request from "./requester"
const baseUrl = 'https://localhost:3030'
const getAll = () => {
    return request.get(`${baseUrl}/lesson/all`)
}
const getPopular = () => {
    return request.get(`${baseUrl}/lesson/popular`)
}
const getDetails = (id) => {
    return request.get(`${baseUrl}/lesson/` + id)
}
const create = (data) => {
    return request.post(`${baseUrl}/lesson/create`, data)
}
const update = (data, id) => {
    return request.put(`${baseUrl}/lesson/` + id, data)
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
const comment = (id, text) => {
    return request.post(`${baseUrl}/comment/create/` + id, {text})
}

export {
    getAll,
    getPopular,
    getDetails,
    create,
    update,
    del,
    buy,
    like,
    comment
}