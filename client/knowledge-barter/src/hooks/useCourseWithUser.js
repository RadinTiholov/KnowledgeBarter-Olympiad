import { useState, useEffect } from "react"

import * as coursesService from '../dataServices/coursesService'
import * as authService from '../dataServices/authService'

export const useCourseWithUser = (id) => {
    const [owner, setOwner] = useState({});
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        coursesService.getDetails(id)
            .then(res => {
                setCourse(res)
                authService.getUserInformation(res.owner)
                    .then(res => {
                        setOwner(res);

                        setIsLoading(false);
                    })
            })
            .catch(err => {
                alert(err);

                setIsLoading(false);
            })
    }, [id])

    return {course, setCourse, owner, isLoading}
}