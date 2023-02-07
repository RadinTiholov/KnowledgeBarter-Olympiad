import { useContext, useState, useEffect } from "react"
import { AuthContext } from '../contexts/AuthContext'
import * as authService from '../dataServices/authService'

export const useBoughtLesson = (id) => {
    const { auth } = useContext(AuthContext)
    const [isBought, setIsBought] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (auth !== null) {
            authService.getDetails(auth?._id)
                .then(res => {
                    setIsBought(res.boughtLessons?.some(x => x == id))

                    setIsLoading(false);
                })
        }
        else{
            setIsLoading(false);
        }
    }, [id])

    return [
        isBought,
        isLoading
    ]
}