import * as request from "./requester"

const baseUrl = 'https://localhost:3030'

const sendEmail = (data) => {
    return request.post(`${baseUrl}/email/send`, data)
}
export{
    sendEmail
}