import { useEffect, useState } from "react"
import { Banner } from "./Banner/Banner"
import { LessonsDisplay } from "./LessonsDisplay/LessonsDisplay"
import { PointsBanner } from "./PointsBanner/PointsBanner"
import * as lessonsService from '../../services/lessonsService'
import * as coursesService from '../../services/coursesService'

export const Home = () => {
    const [lessons, setLessons] = useState([]);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        lessonsService.getPopular()
            .then(res => setLessons(res))
            .catch(err => alert(err))
        coursesService.getHighest()
            .then(res => setCourses(res))
            .catch(err => alert(err))
    }, [])

    return (
        <>
            <Banner/>
            <LessonsDisplay title = {'Most popular lessons'} route = {'/lesson/details/'} lessons = {!Array.isArray(lessons) ? [] : lessons}/>
            <LessonsDisplay title = {'Highest rated courses'} route = {'/course/details/'} courses = {!Array.isArray(courses) ? [] : courses}/>
            <PointsBanner/>
        </>
    )
}