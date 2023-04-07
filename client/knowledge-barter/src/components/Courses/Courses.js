import './Courses.css'
import { useContext, useEffect, useMemo, useState } from 'react'
import { CourseContext } from '../../contexts/CourseContext'
import background from '../../images/waves-lessons.svg'
import { Course } from './Course/Course'
import Pagination from '../common/Pagination/Pagination'
import { useSearchParams } from 'react-router-dom'

let pageSize = 10;

export const Courses = () => {
    const { courses } = useContext(CourseContext)
    const [searchParams, setSearchParams] = useSearchParams();

    const [collectionLength, setCollectionLength] = useState(0);
    useEffect(() => {
        if (searchParams.get('search')) {
            setCollectionLength(courses.filter(x => x.title.toLowerCase().includes(searchParams.get('search')?.toLowerCase())).length);
        }
        else{
            setCollectionLength(courses.length);
        }
    }, [collectionLength, courses, searchParams]);

    const [currentPage, setCurrentPage] = useState(1);
    const currentCollection = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        if (searchParams.get('search')) {
            return courses.filter(x => x.title.toLowerCase().includes(searchParams.get('search').toLowerCase())).slice(firstPageIndex, lastPageIndex);
        }

        return courses.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, courses, searchParams]);

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-courses">
            <div className="container">
                <div className="col text-xl-start">
                    <h1 className="fw-bold mb-3 px-4 pt-5">All Courses{ searchParams.get('search') ? ` / ${searchParams.get('search')}` : ''}</h1>
                </div>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5 pt-3">
                    {searchParams.get('search')
                            ? currentCollection.map(x => x.title.toLowerCase().includes(searchParams.get('search').toLowerCase())
                                ? <Course {...x} key={x.id} />
                                : null)
                            : currentCollection.map(x => <Course {...x} key={x.id} />)}
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