import './Lessons.css'
import { Lesson } from './Lesson/Lesson'
import { useContext, useEffect, useMemo, useState } from 'react'
import { LessonContext } from '../../contexts/LessonContext'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../common/Pagination/Pagination'

let pageSize = 10;

export const Lessons = () => {
    const { lessons } = useContext(LessonContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const [collectionLength, setCollectionLength] = useState(0);
    useEffect(() => {
        if (searchParams.get('search')) {
            setCollectionLength(lessons.filter(x => x.title.toLowerCase().includes(searchParams.get('search')?.toLowerCase())).length);
        }
        else {
            setCollectionLength(lessons.length);
        }
    }, [collectionLength, lessons, searchParams])

    const [currentPage, setCurrentPage] = useState(1);
    const currentCollection = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        if (searchParams.get('search')) {
            return lessons.filter(x => x.title.toLowerCase().includes(searchParams.get('search').toLowerCase())).slice(firstPageIndex, lastPageIndex);
        }

        return lessons.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, lessons, searchParams]);

    return (
        <div className="backgound-layer-lessons">
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 px-4 pt-5">All Lessons</h1>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5 pt-3">
                        {searchParams.get('search')
                            ? currentCollection.map(x => x.title.toLowerCase().includes(searchParams.get('search').toLowerCase())
                                ? <Lesson {...x} key={x.id} />
                                : null)
                            : currentCollection.map(x => <Lesson {...x} key={x.id} />)}
                    </div>
                </div>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={collectionLength}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>

    )
}