import { useEffect, useState } from "react"
import { Banner } from "./Banner/Banner"
import { LessonsDisplay } from "./LessonsDisplay/LessonsDisplay"
import { PointsBanner } from "./PointsBanner/PointsBanner"
import * as lessonsService from '../../dataServices/lessonsService'
import * as coursesService from '../../dataServices/coursesService'

export const Home = () => {
    const [lessons, setLessons] = useState([]);
    const [courses, setCourses] = useState([]);

    const [isLoadingLessons, setIsLoadingLessons] = useState(true);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);

    useEffect(() => {
        lessonsService.getPopular()
            .then(res => {
                setIsLoadingLessons(false);
                setLessons(res);
            })
            .catch(err => alert(err))
        coursesService.getHighest()
            .then(res => {
                setIsLoadingCourses(false);
                setCourses(res);
            })
            .catch(err => alert(err))
    }, [])

    return (
        <>
            <Banner/>
            <LessonsDisplay title = {'Most popular lessons'} route = {'/lesson/details/'} lessons = {!Array.isArray(lessons) ? [] : lessons} isLoadingLessons = {isLoadingLessons} />
            <LessonsDisplay title = {'Highest rated courses'} route = {'/course/details/'} courses = {!Array.isArray(courses) ? [] : courses} isLoadingCourses = {isLoadingCourses} />
            <PointsBanner/>
        </>
    )
}