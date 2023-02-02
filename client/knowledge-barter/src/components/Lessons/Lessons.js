import './Lessons.css'
import { Lesson } from './Lesson/Lesson'
import { useContext, useMemo, useState } from 'react'
import { LessonContext } from '../../contexts/LessonContext'
import { useParams } from 'react-router-dom'
import Pagination from '../common/Pagination/Pagination'

let pageSize = 10;

export const Lessons = () => {
    const { lessons } = useContext(LessonContext);
    const { search } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return lessons.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, lessons]);

    return (
        <div className="backgound-layer-lessons">
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 px-4 pt-5">All Lessons</h1>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5 pt-3">
                        {search ? currentTableData.map(x => x.title.toLowerCase().includes(search.toLowerCase()) ? <Lesson {...x} key={x.id} /> : null) : currentTableData.map(x => <Lesson {...x} key={x.id} />)}
                    </div>
                </div>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={lessons.length}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>

    )
}