import * as request from "./requester"

const baseUrl = 'https://knowledgebarterserver.azurewebsites.net'

const getAll = (receiverUsername) => {
    return request.get(`${baseUrl}/message/all/${receiverUsername}`)
}
const create = (data) => {
    return request.post(`${baseUrl}/message/create`, data)
}

export{
    getAll,
    create
}