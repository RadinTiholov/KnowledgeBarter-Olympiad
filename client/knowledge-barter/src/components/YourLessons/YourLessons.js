import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { LessonContext } from '../../contexts/LessonContext'
import { Lesson } from './Lesson/Lesson'
import './YourLessons.css'

export const YourLessons = () => {
    const { auth } = useContext(AuthContext);
    const { lessons } = useContext(LessonContext);

    return (
        <>
            <div className="col text-xl-center">
                <h1 className="fw-bold pb-3 pt-3 text-center">Your Lessons</h1>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5 pt-3">
                        {lessons.filter(x => x.owner === auth._id).length > 0 ? lessons.filter(x => x.owner === auth._id)?.map(x => <Lesson {...x} key={x.id} />) : <p className='text-center'>No lessons yet.</p>}
                    </div>
                </div>
            </div>
        </>

    )
}