import { Card } from './Card/Card'
import './LessonsDisplay.css'
export const LessonsDisplay = (props) => {
    return (
        <section id="lessons-display">
            <div className="container">
                <div className="row">
                    <div className="col text-xl-center">
                        <h1 className="fw-bold mb-4 mt-4">{props.title}</h1>
                    </div>
                </div>
                <div style={{ paddingBottom: "2rem" }} className=''>
                    <div className="row gy-5">
                        {props.lessons ? props.lessons?.map(x => <Card key={x.id} route={props.route} {...x} />) : props.courses ? null : <p className='text-center'>No lessons yet!</p>}
                        {props.courses ? props.courses?.map(x => <Card key={x.id} route={props.route} {...x} />) : props.lessons ? null : <p className='text-center'>No courses yet!</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}