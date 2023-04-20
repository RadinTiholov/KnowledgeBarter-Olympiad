import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { CourseContext } from '../../contexts/CourseContext';
import { Course } from './Course/Course'
import './YourCourses.css'
import { useTranslation } from 'react-i18next';

export const YourCourses = () => {
    const { courses } = useContext(CourseContext);
    const { auth } = useContext(AuthContext);
    const { t } = useTranslation();

    return (
        <>
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5 text-center">{t("yourCourses")}</h1>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5 pt-3">
                        {courses.filter(x => x.owner === auth._id).length > 0 ? courses.filter(x => x.owner === auth._id)?.map(x => <Course {...x} key={x.id} />) : <p className='text-center'>No courses yet.</p>}
                    </div>
                </div>
            </div>
        </>
    )
}