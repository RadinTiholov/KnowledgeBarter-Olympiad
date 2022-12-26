import { useState, useEffect } from "react"

import * as lessonsService from '../services/lessonsService'
import * as authService from '../services/authService'
import { useNavigate } from "react-router-dom";

export const useLessonsWithUser = (id) => {
    const [owner, setOwner] = useState({});
    const [lesson, setLesson] = useState({});
    const [commentedUsers, setCommentedUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        lessonsService.getDetails(id)
            .then(res => {
                setLesson(res)
                authService.getDetails(res.owner)
                    .then(res => setOwner(res))

                let promises = [];
                for (let i = 0; i < res.comments.length; i++) {
                    promises.push(authService.getDetails(res.comments[i].owner))
                }
                Promise.all(promises)
                    .then((values) => {
                        setCommentedUsers(values)
                    });
            })
            .catch(err => {
                setLesson({
                    title: "Lesson not found or deleted (sorry)",
                    description: "Lesson not found or deleted (sorry)",
                })
            })
    }, [id])

    return {lesson, setLesson, owner, commentedUsers, setCommentedUsers}
}