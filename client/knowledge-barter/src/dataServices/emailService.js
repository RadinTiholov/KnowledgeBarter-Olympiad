import * as request from "./requester"

const baseUrl = 'https://knowledgebarterserver.azurewebsites.net'

const sendEmail = (data) => {
    return request.post(`${baseUrl}/email/send`, data)
}
export{
    sendEmail
}