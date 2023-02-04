import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../contexts/AuthContext'
import * as lessonService from '../dataServices/lessonsService';
import * as courseService from '../dataServices/coursesService';
import * as authService from '../dataServices/authService'
import { LessonContext } from "../contexts/LessonContext";
import { CourseContext } from "../contexts/CourseContext";
export const useCollectionInfo = (collectionName) => {
    const [fullUserInfo, setfullUserInfo] = useState({});
    const [collection, setCollection] = useState([]);
    const { auth } = useContext(AuthContext);
    const { lessons } = useContext(LessonContext);
    const { courses } = useContext(CourseContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authService.getDetails(auth._id)
            .then(res => {
                setfullUserInfo(res)
                if (collectionName.includes('Lesson')) {
                    let promises = [];
                    for (let i = 0; i < res[collectionName].length; i++) {
                        if (lessons.some(x => x.id === res[collectionName][i])) {
                            promises.push(lessonService.getDetails(res[collectionName][i]))
                        }
                    }
                    Promise.all(promises)
                        .then((values) => {
                            setCollection(values)
                            setIsLoading(false);
                        });
                } else {
                    let promises = [];
                    for (let i = 0; i < res[collectionName].length; i++) {
                        if (courses.some(x => x.id === res[collectionName][i])) {
                            promises.push(courseService.getDetails(res[collectionName][i]))
                        }
                    }
                    Promise.all(promises)
                        .then((values) => {
                            setCollection(values)
                            setIsLoading(false);
                        });
                }
            })
    }, [lessons, courses, auth, collectionName])

    return [collection, isLoading]
}