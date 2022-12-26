import './Courses.css'
import { useContext } from 'react'
import { CourseContext } from '../../contexts/CourseContext'
import background from '../../images/waves-lessons.svg'
import { Course } from './Course/Course'

export const Courses = () => {
    const {courses} = useContext(CourseContext)
    return (
        <div style = {{backgroundImage: `url(${background})`}}className="backgound-layer-courses">
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5">All Courses</h1>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5">
                        {courses.map(x => <Course {...x} key= {x._id}/>)}
                    </div>
                </div>
            </div>
        </div>

    )
}