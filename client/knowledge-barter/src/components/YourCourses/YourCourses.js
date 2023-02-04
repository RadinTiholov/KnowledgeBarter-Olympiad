import { useCollectionInfo } from '../../hooks/useCollectionInfo';
import background from '../../images/waves-lessons.svg'
import { BookSpinner } from '../common/Spinners/BookSpinner';
import { Course } from './Course/Course'
import './YourCourses.css'
export const YourCourses = () => {
    const [collection, isLoading] = useCollectionInfo('ownCourses');
    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-courses">
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5">Your Courses</h1>
            </div>
            {isLoading ?
                <BookSpinner /> :
                <div className="container">
                    <div className="text-center">
                        <div className="row row-cols-5 gy-3 pb-5 pt-3">
                            {collection.length > 0 ? collection?.map(x => <Course {...x} key={x.id} />) : <p className='text-center'>No courses yet.</p>}
                        </div>
                    </div>
                </div>}

        </div>

    )
}