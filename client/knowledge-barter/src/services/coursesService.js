import * as request from "./requester"
const baseUrl = 'http://localhost:3030'
const getAll = () => {
    return request.get(`${baseUrl}/course/all`)
}
const getHighest = () => {
    return request.get(`${baseUrl}/course/highest`)
}
const getDetails = (id) => {
    return request.get(`${baseUrl}/course/` + id)
}
const create = (data) => {
    return request.post(`${baseUrl}/course/create`, data)
}
const update = (data, id) => {
    return request.put(`${baseUrl}/course/` + id, data)
}
const del = (id) => {
    return request.del(`${baseUrl}/course/` + id)
}
const buy = (id) => {
    return request.get(`${baseUrl}/course/buy/` + id)
}
const like = (id) => {
    return request.get(`${baseUrl}/course/like/` + id)
}
export {
    getAll,
    getHighest,
    getDetails,
    create,
    update,
    del,
    buy,
    like
}