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

    const [sortBy, setSortBy] = useState('');

    const changeSortBy = (e) => {
        setSortBy(e.target.innerText)
    }

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
            return lessons
                .sort((a, b) => b[sortBy.toLocaleLowerCase()] - a[sortBy.toLocaleLowerCase()])
                .filter(x => x.title.toLowerCase().includes(searchParams.get('search').toLowerCase()))
                .slice(firstPageIndex, lastPageIndex);
        }

        return lessons
            .sort((a, b) => b[sortBy.toLocaleLowerCase()] - a[sortBy.toLocaleLowerCase()])
            .slice(firstPageIndex, lastPageIndex);
    }, [currentPage, lessons, searchParams, sortBy]);

    return (
        <div className="backgound-layer-lessons">
            <div className="container d-flex">
                <div className="col text-xl-start">
                    <h1 className="fw-bold mb-3 px-4 pt-5">All Lessons{searchParams.get('search') ? ` / ${searchParams.get('search')}` : ''}</h1>
                </div>
            </div>
            <div className='container'>
                <div className="card sort-menu">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-sm-2'>
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
                            <div className='col-sm-3'>
                                <p>Filter by views <i className="fa-solid fa-eye fa-sm" /></p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadio1000" />
                                    <label className="form-check-label" htmlFor="flexRadio1000">
                                        <p>1000 & up</p>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadio100" />
                                    <label className="form-check-label" htmlFor="flexRadio100">
                                        <p>100 - 999</p>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadio1" />
                                    <label className="form-check-label" htmlFor="flexRadio1">
                                        <p>1 - 99</p>
                                    </label>
                                </div>
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