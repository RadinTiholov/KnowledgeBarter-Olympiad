import { useContext, useState, useEffect } from "react"
import { AuthContext } from '../contexts/AuthContext'
import * as authService from '../services/authService'
export const useBoughtCourse = (id) => {
    const { auth } = useContext(AuthContext)
    const [isBought, setIsBought] = useState(false);

    useEffect(() => {
        if (auth !== null) {
            authService.getDetails(auth?._id)
            .then(res => setIsBought(res.boughtCourses?.some(x => x == id)))
        }
    }, [])
    return [
        isBought
    ]
}