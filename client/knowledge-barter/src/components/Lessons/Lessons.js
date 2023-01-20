import './Lessons.css'
import background from '../../images/waves-lessons.svg'
import { Lesson } from './Lesson/Lesson'
import {useContext} from 'react'
import { LessonContext } from '../../contexts/LessonContext'
import { useParams } from 'react-router-dom'

export const Lessons = () => {
    const {lessons} = useContext(LessonContext);
    const {search} = useParams();
    return (
        <div style = {{backgroundImage: `url(${background})`}}className="backgound-layer-lessons">
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5">All Lessons</h1>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5">
                        {search ? lessons.map(x => x.title.toLowerCase().includes(search.toLowerCase()) ? <Lesson {...x} key = {x.id}/> : null) : lessons.map(x => <Lesson {...x} key = {x.id}/>)}
                    </div>
                </div>
            </div>
        </div>

    )
}