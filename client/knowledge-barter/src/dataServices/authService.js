import * as request from "./requester"
import * as multipartRequester from "./multipartFormDataRequester"

const baseUrl = 'https://knowledgebarterserver.azurewebsites.net'

const login = (data) => {
    return request.post(`${baseUrl}/identity/login`, data)
}

const register = (data) => {
    return multipartRequester.post(`${baseUrl}/identity/register`, data)
}

const getDetails = (id) => {
    return request.get(`${baseUrl}/identity/profile/` + id)
}

const getUserInformation = (id) => {
    return request.get(`${baseUrl}/identity/userinformation/` + id)
}

const getAllProfiles = () => {
    return request.get(`${baseUrl}/identity/allProfiles/`)
}

const getAllContacts = () => {
    return request.get(`${baseUrl}/identity/allContacts`);
}

export{
    login,
    register,
    getDetails,
    getAllProfiles,
    getAllContacts,
    getUserInformation,
}