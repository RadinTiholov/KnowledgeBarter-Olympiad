import { useState, useEffect } from "react"

import * as coursesService from '../services/coursesService'
import * as authService from '../services/authService'

export const useCourseWithUser = (id) => {
    const [owner, setOwner] = useState({});
    const [course, setCourse] = useState({});
    useEffect(() => {
        coursesService.getDetails(id)
            .then(res => {
                setCourse(res)
                authService.getDetails(res.owner)
                    .then(res => setOwner(res))
            })
    }, [id])

    return {course, setCourse, owner}
}