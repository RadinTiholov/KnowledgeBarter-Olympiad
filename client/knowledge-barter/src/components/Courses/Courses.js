import './Courses.css'
import { useContext, useEffect, useMemo, useState } from 'react'
import { CourseContext } from '../../contexts/CourseContext'
import background from '../../images/waves-lessons.svg'
import { Course } from './Course/Course'
import Pagination from '../common/Pagination/Pagination'
import { useSearchParams } from 'react-router-dom'
import { FilterMenu } from '../common/FilterMenu/FilterMenu'
import { useTranslation } from 'react-i18next'

let pageSize = 10;

export const Courses = () => {
    const { courses } = useContext(CourseContext)
    const [searchParams, setSearchParams] = useSearchParams();

    const { t } = useTranslation();

    const [collectionLength, setCollectionLength] = useState(0);

    const [sortBy, setSortBy] = useState('');
    const [filterByComments, setFilterByComments] = useState(0);
    const [filterByLikes, setFilterByLikes] = useState(0);

    const changeSortBy = (e) => {
        setSortBy(e.target.innerText)
    }

    const changeFilterByComments = (e) => {
        setFilterByComments(Number(e.target.value))
    }

    const changeFilterByLikes = (e) => {
        setFilterByLikes(Number(e.target.value))
    }

    const clearSelection = () => {
        setFilterByComments(0);
        setFilterByLikes(0);
    }

    const commentsFilter = (x) => {
        return filterByComments === 3
            ? x.comments >= 1000
            : filterByComments === 2
                ? x.comments < 1000 && x.comments >= 100
                : filterByComments === 1
                    ? x.comments < 100 && x.comments >= 1
                    : true
    }

    const likesFilter = (x) => {
        return filterByLikes === 3
            ? x.likes >= 1000
            : filterByLikes === 2
                ? x.likes < 1000 && x.likes >= 100
                : filterByLikes === 1
                    ? x.likes < 100 && x.likes >= 1
                    : true
    }

    useEffect(() => {
        // Set the collection length
        if (searchParams.get('search')) {
            setCollectionLength(courses
                .filter(commentsFilter)
                .filter(likesFilter)
                .filter(x => x.title.toLowerCase()
                    .includes(searchParams.get('search')?.toLowerCase())).length);
        }
        else {
            setCollectionLength(courses
                .filter(commentsFilter)
                .filter(likesFilter)
                .length);
        }
    }, [collectionLength, courses, searchParams, filterByComments, filterByLikes]);

    const [currentPage, setCurrentPage] = useState(1);
    const currentCollection = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        if (searchParams.get('search')) {
            return courses
                .filter(commentsFilter)
                .filter(likesFilter)
                .sort((a, b) => b[sortBy.toLocaleLowerCase()] - a[sortBy.toLocaleLowerCase()])
                .filter(x => x.title.toLowerCase().includes(searchParams.get('search').toLowerCase()))
                .slice(firstPageIndex, lastPageIndex);
        }

        return courses
            .filter(commentsFilter)
            .filter(likesFilter)
            .sort((a, b) => b[sortBy.toLocaleLowerCase()] - a[sortBy.toLocaleLowerCase()])
            .slice(firstPageIndex, lastPageIndex);
    }, [currentPage, courses, searchParams, sortBy, filterByComments, filterByLikes]);

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-courses">
            <div className="container">
                <div className="col text-xl-start">
                    <h1 className="fw-bold mb-3 px-4 pt-5">{t("allCourses")}{searchParams.get('search') && searchParams.get('search') != 'undefined' ? ` / ${searchParams.get('search')}` : ''}</h1>
                </div>
            </div>

            <div className='container'>
                <div className="card sort-menu">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-2'>
                                <div className="btn-group">
                                    <button className="btn sort-menu-button btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {t("sortBy")}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={changeSortBy}>Likes</button></li>
                                        <li><button className="dropdown-item" onClick={changeSortBy}>Comments</button></li>
                                        <li><button className="dropdown-item" onClick={changeSortBy}>None</button></li>
                                    </ul>
                                </div>
                                <div className='mt-1'>
                                    <button onClick={clearSelection} className="btn btn-lg" type="button" style={{ backgroundColor: "#636EA7", color: "#fff" }}>
                                        {t("clear")}
                                    </button>
                                </div>
                            </div>
                            <div className='col-md-5'>
                                <FilterMenu param={'comments'} iconName={'comment'} option={filterByComments} changeOption={changeFilterByComments} />
                            </div>
                            <div className='col-md-5'>
                                <FilterMenu param={'likes'} iconName={'thumbs-up'} option={filterByLikes} changeOption={changeFilterByLikes} />
                            </div>
                        </div>
                    </div>
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