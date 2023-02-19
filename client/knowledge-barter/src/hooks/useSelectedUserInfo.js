import { useContext, useState, useEffect } from "react"
import { AuthContext } from '../contexts/AuthContext'
import * as authService from '../dataServices/authService'

export const useSelectedUserInfor = (id) => {
    const [fullUserInfo, setfullUserInfo] = useState({})
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth !== null) {
            authService.getDetails(id)
                .then(res => setfullUserInfo(res))
                .catch(err => console.log(err))
        }
    }, [id])

    return [
        fullUserInfo, setfullUserInfo
    ]
}