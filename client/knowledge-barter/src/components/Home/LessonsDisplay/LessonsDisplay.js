import { Card } from './Card/Card'
import './LessonsDisplay.css'
import { BookSpinner } from '../../common/Spinners/BookSpinner'

export const LessonsDisplay = (props) => {
    return (
        <section id="lessons-display">
            <div className="container">
                <div className="row">
                    <div className="col text-xl-center">
                        <h1 className="fw-bold mb-4 mt-4">{props.title}</h1>
                    </div>
                </div>
                {props.isLoadingLessons || props.isLoadingCourses
                    ? <BookSpinner />
                    : <div style={{ paddingBottom: "2rem" }} className=''>
                        <div className="row gy-5">
                            {props.lessons
                                ?
                                <div
                                    id="carouselExampleControls"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item active" >
                                            <div style={{display: 'flex'}}>
                                                <Card key={props.lessons[0].id} route={props.route} {...props.lessons[0]} />
                                                
                                                <Card key={props.lessons[0].id} route={props.route} {...props.lessons[0]} />
                                                </div>
                                        </div>
                                        <div className="carousel-item">
                                        <div style={{display: 'flex'}}>

                                            {props.lessons?.map(x => <Card key={x.id} route={props.route} {...x} />)}
                                        </div>
                                        </div>
                                    </div>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselExampleControls"
                                        data-bs-slide="prev"
                                    >
                                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselExampleControls"
                                        data-bs-slide="next"
                                    >
                                        <span className="carousel-control-next-icon" aria-hidden="true" />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                //props.lessons?.map(x => <Card key={x.id} route={props.route} {...x} />)
                                : props.courses ? null : <p className='text-center'>No lessons yet!</p>}
                            {props.courses ? props.courses?.map(x => <Card key={x.id} route={props.route} {...x} />) : props.lessons ? null : <p className='text-center'>No courses yet!</p>}
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}