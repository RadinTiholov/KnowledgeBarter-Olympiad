import './LessonDetailsBought.css'
import { Link } from 'react-router-dom'
import background from '../../../images/waves-details.svg'
import { Comment } from './Comment/Comment'
import { Lesson } from './Lesson/Lesson'
import { useState } from 'react'
import * as lessonsService from '../../../dataServices/lessonsService'
import { commentValidator } from '../../../infrastructureUtils/validationUtils'

export const LessonDetailsBought = (props) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (e) => {
        setComment(e.target.value)
    }

    const onComment = (e) => {
        e.preventDefault();
        lessonsService.comment(props.lesson.id, comment)
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
            {/* Login Form */}
            <div className="container">
                <div className="row pt-5">
                    <div className="col-10">
                        <iframe
                            title='video'
                            className="video"
                            src={props.lesson.video}
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                            allowfullscreen>
                        </iframe>
                        <div className="w-100 card card-display my-3">
                            <div className="mx-3">
                                <h1>{props.lesson.title}</h1>
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
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-outline-warning btn fw-bold"
                                                style={{ backgroundColor: "red" }}
                                                onClick={props.onClickDelete}
                                            >
                                                Delete
                                            </button></> : <>
                                            {props.isLiked ?
                                                <button
                                                    className="btn btn-outline-warning btn fw-bold"
                                                    style={{
                                                        backgroundColor: "#636EA7"
                                                    }}
                                                    disabled={true}
                                                >
                                                    Liked
                                                </button> :
                                                <button
                                                    className="btn btn-outline-warning btn fw-bold"
                                                    style={{
                                                        backgroundColor: "#636EA7"
                                                    }}
                                                    onClick={props.likeLessonOnClick}
                                                >
                                                    Like
                                                </button>}
                                            <Link
                                                className="btn btn-outline-warning btn fw-bold"
                                                style={{ backgroundColor: "#636EA7" }}
                                                to={'/lesson/contact/' + props.lesson.id}
                                            >
                                                Contact with owner
                                            </Link>
                                        </>
                                    }
                                </div>
                                <h5>{props.lesson.description}</h5>
                            </div>
                            <div className="text-center">
                                <h2>Information</h2>
                                <h5>
                                    {props.lesson.article}
                                </h5>
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
                                        onBlur ={() => commentValidator(10, 200, comment, setError, setErrorMessage)}
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
                        <p>Recommended lessons</p>
                        {props.recommendedLessons?.map(x => <Lesson key={x.id} {...x} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}