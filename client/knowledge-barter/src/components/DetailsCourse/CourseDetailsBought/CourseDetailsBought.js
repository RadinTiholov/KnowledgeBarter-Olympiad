import './CourseDetailsBought.css'
import { Link } from 'react-router-dom'
import background from '../../../images/waves-details.svg'
import { Comment } from './Comment/Comment'
import { Lesson } from './Lesson/Lesson'
import { useState } from 'react'
import * as commentsService from '../../../dataServices/commentsService'
import { commentValidator } from '../../../infrastructureUtils/validationUtils'
import { speechHandler } from '../../../infrastructureUtils/commonUtils'
import QRCode from 'react-qr-code'
import DOMPurify from 'dompurify'

export const CourseDetailsBought = (props) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const synth = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance();

    const onChange = (e) => {
        setComment(e.target.value)
    }

    const onComment = (e) => {
        e.preventDefault();
        commentsService.create(props.lesson.id, comment)
            .then(res => {
                props.comment(res)
                setComment('');
            }).catch(err => {
                setError(true)
                setErrorMessage(err.message)
                setComment('');
            })

    }
    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-details">
            <div className="container">
                <div className="row pt-5">
                    <div className="col-10">
                        <h1>{props.course.title}</h1>
                        <iframe
                            title='video'
                            className="video"
                            src={props.lesson.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                            allowFullScreen>
                        </iframe>

                        <div className="card card-display my-3">
                            <div className="mx-3">
                                <h1>{props.lesson.title}</h1>

                                <div className='d-flex'>
                                    {
                                        props.lesson.tags?.map(x => <h4><span className="badge rounded-pill bg-secondary">{x}</span></h4>)
                                    }
                                </div>

                                <div className='info-bar d-flex align-items-center flex-wrap'>
                                    <div>
                                        <i className="fa-solid fa-thumbs-up fa-2xl" />
                                        <span className="fw-bold"> : {props.lesson.likes}</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-eye fa-2xl" />
                                        <span className="fw-bold"> : {props.lesson.views}</span>
                                    </div>
                                    <a
                                        className="btn btn-outline-warning btn fw-bold"
                                        style={{ backgroundColor: "#636EA7" }}
                                        href={props.lesson?.resources}
                                    >
                                        Resources
                                    </a>
                                    {props.isOwner ?
                                        <>
                                            <Link
                                                className="btn btn-outline-warning btn fw-bold"
                                                style={{ backgroundColor: "#636EA7" }}
                                                to={'/lesson/edit/' + props.lesson.id}
                                            >
                                                Edit Lesson
                                            </Link>

                                            <Link
                                                className="btn btn-outline-warning btn fw-bold"
                                                style={{ backgroundColor: "#636EA7" }}
                                                to={'/course/edit/' + props.course.id}
                                            >
                                                Edit Course
                                            </Link>

                                            <div className="modal" tabIndex="-1">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Modal title</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>Modal body text goes here.</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="button" className="btn btn-outline-warning btn fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: "red" }}>
                                                Delete
                                            </button>

                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>Are you sure you want to delete this lesson?</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button
                                                                className="btn btn-outline-warning btn fw-bold"
                                                                style={{ backgroundColor: "red" }}
                                                                onClick={props.onClickDeleteLesson}
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Delete Lesson
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <button
                                                className="btn btn-outline-warning btn fw-bold"
                                                style={{ backgroundColor: "red" }}
                                                onClick={props.onClickDeleteCourse}
                                            >
                                                Delete Course
                                            </button> */}

                                            <button type="button" className="btn btn-outline-warning btn fw-bold" data-bs-toggle="modal" data-bs-target="#modal-2" style={{ backgroundColor: "red" }}>
                                                Delete Course
                                            </button>

                                            <div className="modal fade" id="modal-2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>Are you sure you want to delete this course?</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button
                                                                className="btn btn-outline-warning btn fw-bold"
                                                                style={{ backgroundColor: "red" }}
                                                                onClick={props.onClickDeleteCourse}
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Delete Course
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </> :
                                        <>
                                            {props.isLiked ? <button
                                                className="btn btn-outline-warning btn fw-bold"
                                                style={{ backgroundColor: "#636EA7" }}
                                                disabled={true}
                                            >
                                                Liked Course
                                            </button> :
                                                <button
                                                    className="btn btn-outline-warning btn fw-bold"
                                                    style={{ backgroundColor: "#636EA7" }}
                                                    onClick={props.likeCourseOnClick}
                                                >
                                                    Like Course
                                                </button>}

                                        </>}
                                    <button type="button" className="btn btn-outline-warning btn fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: "#636EA7" }}>
                                        <i className="fa-solid fa-qrcode"></i>
                                    </button>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <QRCode fgColor='#636EA7' value={`https://knowledge-barter.web.app/course/details/${props.course.id}/${props.lesson.id}`} />
                                                </div>
                                                <div className="modal-footer">
                                                    <span>{`https://knowledge-barter.web.app/course/details/${props.course.id}/${props.lesson.id}`}</span>
                                                    <button type="button" className="btn btn-primary" onClick={() => { navigator.clipboard.writeText(`https://knowledge-barter.web.app/course/details/${props.course.id}/${props.lesson.id}`) }}>Copy</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h5 className='px-2'>{props.lesson.description}</h5>
                            </div>
                            <div className="px-3">
                            <div className='article'>
                                    <h2 className='text-center text-light pt-1'>Information</h2>
                                    <div className='article-text'>
                                        <h5>
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.lesson.article) }}></div>
                                        </h5>
                                        <div className='w-100 d-inline-flex justify-content-end'>
                                            <button
                                                className='btn speech-button'
                                                onClick={() => speechHandler(speech, props.lesson.article, synth)}>
                                                <i className="fa-solid fa-volume-high"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-center">Comment</h2>
                            {/* Comment form */}
                            <form onSubmit={onComment}>
                                <div className="form-outline mx-5">
                                    <textarea
                                        className="form-control"
                                        id="textAreaExample"
                                        rows={4}
                                        style={{ background: "#fff" }}
                                        placeholder="Comment"
                                        value={comment}
                                        onChange={onChange}
                                        onBlur={() => commentValidator(10, 200, comment, setError, setErrorMessage)}
                                    />
                                </div>
                                <div className="mt-2 pt-1 pb-2 mx-5">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-sm"
                                        disabled={error}>
                                        Post comment
                                    </button>
                                </div>
                                {error &&
                                    <div
                                        className="alert alert-danger d-flex align-items-center mt-3 mx-5"
                                        role="alert"
                                    >
                                        <i className="fa-solid fa-triangle-exclamation me-2" />
                                        <div className="text-center">
                                            {errorMessage}
                                        </div>
                                    </div>}
                            </form>
                            {props.lesson.comments?.length > 0 ? props.lesson.comments?.map(x => <Comment key={x.id} {...x} />) : <p className='text-center'>No comments yet.</p>}
                        </div>
                    </div>
                    <div className="col-2">
                        <p>Lessons</p>
                        <div className='lessons-container'>
                            {props.course?.lessons?.map(x => <Lesson key={x.id} {...x} courseId={props.course.id} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}