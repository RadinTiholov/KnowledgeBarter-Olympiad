import { useState, useEffect } from "react"
import * as authService from '../services/authService'
export const useUserInfo = () => {
    const [fullUserInfo, setfullUserInfo] = useState({})
    useEffect(() => {
        authService.getDetails()
            .then(res => setfullUserInfo(res))
            .catch(err => console.log(err))
    }, [])
    return [
        fullUserInfo, setfullUserInfo
    ]
}