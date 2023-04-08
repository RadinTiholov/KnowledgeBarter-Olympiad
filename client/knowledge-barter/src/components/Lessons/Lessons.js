import './Lessons.css'
import { Lesson } from './Lesson/Lesson'
import { useContext, useEffect, useMemo, useState } from 'react'
import { LessonContext } from '../../contexts/LessonContext'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../common/Pagination/Pagination'
import { FilterMenu } from '../common/FilterMenu/FilterMenu'

let pageSize = 10;

export const Lessons = () => {
    const { lessons } = useContext(LessonContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const [collectionLength, setCollectionLength] = useState(0);

    const [sortBy, setSortBy] = useState('');
    const [filterByViews, setFilterByViews] = useState(0);
    const [filterByLikes, setFilterByLikes] = useState(0);

    const changeSortBy = (e) => {
        setSortBy(e.target.innerText)
    }

    const changeFilterByViews = (e) => {
        setFilterByViews(Number(e.target.value))
    }

    const changeFilterByLikes = (e) => {
        setFilterByLikes(Number(e.target.value))
    }

    const viewsFilter = (x) => {
        return filterByViews === 3
        ? x.views >= 1000
        : filterByViews === 2
            ? x.views < 1000 && x.views >= 100
            : filterByViews === 1
                ? x.views < 100 && x.views >= 1
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
        // Set the collection lenght
        if (searchParams.get('search')) {
            setCollectionLength(lessons
                .filter(viewsFilter)
                .filter(likesFilter)
                .filter(x => x.title.toLowerCase()
                    .includes(searchParams.get('search')?.toLowerCase())).length);
        }
        else {
            setCollectionLength(lessons
                .filter(viewsFilter)
                .filter(likesFilter)
                .length);
        }
    }, [collectionLength, lessons, searchParams, filterByViews, filterByLikes])

    const [currentPage, setCurrentPage] = useState(1);
    const currentCollection = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        if (searchParams.get('search')) {
            return lessons
                .filter(viewsFilter)
                .filter(likesFilter)
                .sort((a, b) => b[sortBy.toLocaleLowerCase()] - a[sortBy.toLocaleLowerCase()])
                .filter(x => x.title.toLowerCase().includes(searchParams.get('search').toLowerCase()))
                .slice(firstPageIndex, lastPageIndex);
        }

        return lessons
            .filter(viewsFilter)
            .filter(likesFilter)
            .sort((a, b) => b[sortBy.toLocaleLowerCase()] - a[sortBy.toLocaleLowerCase()])
            .slice(firstPageIndex, lastPageIndex);
    }, [currentPage, lessons, searchParams, sortBy, filterByViews, filterByLikes]);

    return (
        <div className="backgound-layer-lessons">
            <div className="container d-flex">
                <div className="col text-xl-start">
                    <h1 className="fw-bold mb-3 px-4 pt-5">All Lessons{searchParams.get('search') && searchParams.get('search') != 'undefined' ? ` / ${searchParams.get('search')}` : ''}</h1>
                </div>
            </div>
            <div className='container'>
                <div className="card sort-menu">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-2'>
                                <div className="btn-group">
                                    <button className="btn sort-menu-button btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort by
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={changeSortBy}>Likes</button></li>
                                        <li><button className="dropdown-item" onClick={changeSortBy}>Views</button></li>
                                        <li><button className="dropdown-item" onClick={changeSortBy}>Comments</button></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-md-5'>
                                <FilterMenu param={'views'} iconName={'eye'} option={filterByViews} changeOption={changeFilterByViews} />
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
                            ? currentCollection
                                .map(x => x.title
                                    .toLowerCase()
                                    .includes(searchParams.get('search')
                                        .toLowerCase())
                                    ? <Lesson {...x} key={x.id} />
                                    : null)
                            : currentCollection
                                .map(x => <Lesson {...x} key={x.id} />)}
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