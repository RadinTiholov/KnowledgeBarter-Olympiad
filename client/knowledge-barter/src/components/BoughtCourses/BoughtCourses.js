import { Course } from './Course/Course'
import './BoughtCourses.css'
import { useCollectionInfo } from '../../hooks/useCollectionInfo';
import { BookSpinner } from '../common/Spinners/BookSpinner';
export const BoughtCourses = () => {
    const [collection, isLoading] = useCollectionInfo('boughtCourses');
    return (
        <>
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5 text-center">Bought Courses</h1>
            </div>
            {isLoading ?
                <BookSpinner/>
                : <div className="container">
                    <div className="text-center">
                        <div className="row row-cols-5 gy-3 pb-5 pt-3">
                            {collection.length > 0
                                ? collection?.map(x => <Course {...x} key={x.id} />)
                                : <p className='text-center'>No courses yet.</p>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}