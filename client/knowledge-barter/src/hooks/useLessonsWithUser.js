import { useState, useEffect } from "react"

import * as lessonsService from '../services/lessonsService'
import * as authService from '../services/authService'

export const useLessonsWithUser = (id) => {
    const [owner, setOwner] = useState({});
    const [lesson, setLesson] = useState({});
    useEffect(() => {
        lessonsService.getDetails(id)
            .then(res => {
                setLesson(res)
                authService.getDetails(res.owner)
                    .then(res => setOwner(res))
            })
            .catch(err => {
                setLesson({
                    title: "Lesson not found or deleted (sorry)",
                    description: "Lesson not found or deleted (sorry)",
                })
            })
    }, [id])

    return {lesson, setLesson, owner}
}