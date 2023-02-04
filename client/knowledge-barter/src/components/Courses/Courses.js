import './Courses.css'
import { useContext, useMemo, useState } from 'react'
import { CourseContext } from '../../contexts/CourseContext'
import background from '../../images/waves-lessons.svg'
import { Course } from './Course/Course'
import Pagination from '../common/Pagination/Pagination'

let pageSize = 10;

export const Courses = () => {
    const { courses } = useContext(CourseContext)

    const [currentPage, setCurrentPage] = useState(1);
    const currentCollection = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return courses.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, courses]);

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-courses">
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5 px-4">All Courses</h1>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5 pt-3">
                        {currentCollection.map(x => <Course {...x} key={x.id} />)}
                    </div>
                </div>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={courses.length}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}