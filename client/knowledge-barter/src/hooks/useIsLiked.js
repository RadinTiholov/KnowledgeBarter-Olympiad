import { useContext, useState, useEffect } from "react"
import { AuthContext } from '../contexts/AuthContext'
import * as authService from '../dataServices/authService'
export const useIsLiked = (id, isLesson) => {
    const [fullUserInfo, setfullUserInfo] = useState({})
    const [isLiked, setIsLiked] = useState(false);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        authService.getDetails(auth?._id)
            .then(res => {
                setfullUserInfo(res)
                if (isLesson) {
                    if (res.likedLessons?.some(x => x == id)) {
                        setIsLiked(true)
                    } else {
                        setIsLiked(false)
                    }
                } else {
                    if (res.likedCourses?.some(x => x == id)) {
                        setIsLiked(true)
                    } else {
                        setIsLiked(false)
                    }
                }
            })
            .catch(err => console.log(err))
    }, [])

    return [
        isLiked, setIsLiked
    ]
}