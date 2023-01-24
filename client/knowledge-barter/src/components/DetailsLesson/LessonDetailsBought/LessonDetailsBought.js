import './LessonDetailsBought.css'
import { Link } from 'react-router-dom'
import background from '../../../images/waves-details.svg'
import { Comment } from './Comment/Comment'
import { Lesson } from './Lesson/Lesson'
import { useState } from 'react'
import * as lessonsService from '../../../services/lessonsService'

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
                        <div className="embed-responsive embed-responsive-16by9" autoFocus>
                            <iframe
                                className="embed-responsive-item"
                                style={{ height: 600, width: 1000 }}
                                src={props.lesson.video}
                                allowFullScreen=""
                            />
                        </div>
                        <div className="card card-display my-3" style={{ width: 1000 }}>
                            <div className="mx-3">
                                <h1>{props.lesson.title}</h1>
                                <i className="fa-solid fa-thumbs-up fa-2xl" />
                                <span className="fw-bold">: {props.lesson.likes}</span>
                                <i className="fa-solid fa-eye fa-2xl" />
                                <span className="fw-bold">: {props.lesson.views}</span>
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
                                    onClick = {props.onClickDelete}
                                >
                                    Delete
                                </button></> : <>
                                {props.isLiked ? 
                                    <button
                                    className="btn btn-outline-warning btn fw-bold"
                                    style={{
                                        backgroundColor: "#636EA7"
                                    }}
                                    disabled = {true}
                                >
                                    Liked
                                </button> : 
                                <button
                                className="btn btn-outline-warning btn fw-bold"
                                style={{
                                    backgroundColor: "#636EA7"
                                }}
                                onClick = {props.likeLessonOnClick}
                            >
                                Like
                            </button>}
                                </>
                                }
                                <h5>{props.lesson.description}</h5>
                            </div>
                            <div className="text-center">
                                <h2>Information</h2>
                                <h5>
                                    {props.lesson.article}
                                </h5>
                            </div>
                            <h2 className="text-center">Comments</h2>
                            {/* Comment form */}
                            <form onSubmit = {onComment}>
                                <div className="form-outline w-100 mx-5">
                                    <textarea
                                        className="form-control"
                                        id="textAreaExample"
                                        rows={3}
                                        style={{ background: "#fff", height: 150, width: 900 }}
                                        placeholder="Comment"
                                        value ={comment}
                                        onChange = {onChange}
                                    />
                                </div>
                                <div className="mt-2 pt-1 mx-5">
                                    <button type="submit" className="btn btn-primary btn-sm">
                                        Post comment
                                    </button>
                                </div>
                                {error && <div
                                        className="alert alert-danger d-flex align-items-center mt-3"
                                        role="alert"
                                    >
                                        <i className="fa-solid fa-triangle-exclamation me-2" />
                                        <div className="text-center">
                                            {errorMessage}
                                        </div>
                                    </div>}
                            </form>
                            {props.lesson.comments?.map(x => <Comment key = {x.id} {...x} />) }
                        </div>
                    </div>
                    <div className="col-2">
                        <p>Most popular lessons</p>
                        {props.mostPopularLessons?.map(x => <Lesson key = {x.id} {...x}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}