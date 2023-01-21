import background from '../../images/waves-lessons.svg'
import { Lesson } from './Lesson/Lesson'
import './BoughtLessons.css'
import { useCollectionInfo } from '../../hooks/useCollectionInfo';
export const BoughtLessons = () => {
    const [collection] = useCollectionInfo('boughtLessons');
    return (
        <div style = {{backgroundImage: `url(${background})`}}className="backgound-layer-lessons">
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5">Bought Lessons</h1>
            </div>
            <div className="container">
                <div className="text-center">
                    <div className="row row-cols-5 gy-3 pb-5">
                        {collection.length > 0 ? collection?.map(x => <Lesson {...x} key= {x.id}/>): <p className='text-center'>No lessons yet.</p>}
                    </div>
                </div>
            </div>
        </div>

    )
}