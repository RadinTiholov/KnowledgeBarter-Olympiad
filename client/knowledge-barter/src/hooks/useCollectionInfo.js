import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../contexts/AuthContext'
import * as lessonService from '../services/lessonsService';
import * as courseService from '../services/coursesService';
import * as authService from '../services/authService'
import { LessonContext } from "../contexts/LessonContext";
import { CourseContext } from "../contexts/CourseContext";
export const useCollectionInfo = (collectionName) => {
    const [fullUserInfo, setfullUserInfo] = useState({});
    const [collection, setCollection] = useState([]);
    const { auth } = useContext(AuthContext);
    const { lessons } = useContext(LessonContext);
    const { courses } = useContext(CourseContext);

    useEffect(() => {
        authService.getDetails(auth._id)
            .then(res => {
                console.log(res[collectionName]);
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
                        });
                }
            })
    }, [])

    return [collection]
}