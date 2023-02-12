import * as request from "./requester"

const baseUrl = 'https://knowledgebarterserver.azurewebsites.net'

const getAll = () => {
    return request.get(`${baseUrl}/comment/all`)
}
const del = (id) => {
    return request.del(`${baseUrl}/comment/delete/` + id)
}
const create = (id, text) => {
    return request.post(`${baseUrl}/comment/create/` + id, {text})
}

export {
    getAll,
    create,
    del,
}