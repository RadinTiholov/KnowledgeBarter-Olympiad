import { useEffect, useState } from "react"
import { Banner } from "./Banner/Banner"
import { LessonsDisplay } from "./LessonsDisplay/LessonsDisplay"
import { PointsBanner } from "./PointsBanner/PointsBanner"
import * as lessonsService from '../../dataServices/lessonsService'
import * as coursesService from '../../dataServices/coursesService'
import { ToastContainer, toast } from "react-toastify"
import { useTranslation } from "react-i18next"

export const Home = () => {

    const { t } = useTranslation();

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
            <Banner />
            <LessonsDisplay title={t('mostPopularLessons')} route={'/lesson/details/'} lessons={!Array.isArray(lessons) ? [] : lessons} isLoadingLessons={isLoadingLessons} />
            <LessonsDisplay title={t('highestRatedCourses')} route={'/course/details/'} courses={!Array.isArray(courses) ? [] : courses} isLoadingCourses={isLoadingCourses} />
            <PointsBanner />
        </>
    )
}