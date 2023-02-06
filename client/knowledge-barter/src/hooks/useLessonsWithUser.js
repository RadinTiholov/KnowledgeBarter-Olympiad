import { useState, useEffect } from "react"

import * as lessonsService from '../dataServices/lessonsService'
import * as authService from '../dataServices/authService'

export const useLessonsWithUser = (id) => {
    const [owner, setOwner] = useState({});
    const [lesson, setLesson] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        lessonsService.getDetails(id)
            .then(res => {
                setLesson(res)
                authService.getUserInformation(res.owner)
                    .then(res => {
                        setOwner(res)

                        setIsLoading(false);
                    })
            })
            .catch(err => {
                setLesson({
                    title: "Lesson not found or deleted (sorry)",
                    description: "Lesson not found or deleted (sorry)",
                })

                setIsLoading(false);
            })
    }, [id])

    return {lesson, setLesson, owner, isLoading}
}