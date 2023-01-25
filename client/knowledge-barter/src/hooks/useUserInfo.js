import { useContext, useState, useEffect } from "react"
import {AuthContext} from '../contexts/AuthContext'
import * as authService from '../dataServices/authService'
export const useUserInfo = () => {
    const [fullUserInfo, setfullUserInfo] = useState({})
    const {auth} = useContext(AuthContext);
    useEffect(() => {
        authService.getDetails(auth?._id)
            .then(res => setfullUserInfo(res))
            .catch(err => console.log(err))
    }, [])
    return [
        fullUserInfo, setfullUserInfo
    ]
}