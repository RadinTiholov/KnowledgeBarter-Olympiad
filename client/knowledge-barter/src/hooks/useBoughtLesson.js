import { useContext, useState, useEffect } from "react"
import { AuthContext } from '../contexts/AuthContext'
import * as authService from '../dataServices/authService'
export const useBoughtLesson = (id) => {
    const { auth } = useContext(AuthContext)
    const [isBought, setIsBought] = useState(false);

    useEffect(() => {
        if (auth !== null) {
            authService.getDetails(auth?._id)
                .then(res => setIsBought(res.boughtLessons?.some(x => x == id)))
        }
    }, [id])
    return [
        isBought
    ]
}