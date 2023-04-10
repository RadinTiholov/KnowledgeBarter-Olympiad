import './Profile.css'
import coinImage from '../../images/coin-image.webp'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useParams } from 'react-router-dom'
import { useSelectedUserInfor } from '../../hooks/useSelectedUserInfo'

export const Profile = () => {
    const { id } = useParams();

    const [fullUserInfo, setfullUserInfo] = useSelectedUserInfor(id)
    const { auth } = useContext(AuthContext);

    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-xl-5">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-start">
                                <img
                                    src={fullUserInfo.imageUrl}
                                    className="rounded-circle avatar-lg img-thumbnail"
                                    alt="profile-image"
                                />
                                <div className="w-100 ms-3">
                                    <h4 className="my-0">{fullUserInfo.username}</h4>
                                    <p className="text-muted">{fullUserInfo.email}</p>
                                    <Link to={`/chat?receiver=${fullUserInfo.username}`}
                                        type="button"
                                        className='btn'
                                        style={{ backgroundColor: "#636EA7", color: "#fff" }}
                                    >
                                        Message
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* start card */}
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <div className="row">
                                <div className='row'>
                                    <div className='col-2'>
                                        <img
                                            className="img-fluid"
                                            src={coinImage}
                                            alt="icon"
                                        />
                                    </div>
                                    <div className='col text-start mt-2'>
                                        <h3>KB Points: {auth.kbPoints}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end card */}
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <div className="row">
                                <div className="col-4 border-end border-light">
                                    <h5 className="text-muted mt-1 mb-2 fw-normal">Lessons</h5>
                                    <h2 className="mb-0 fw-bold">116</h2>
                                </div>
                                <div className="col-4 border-end border-light">
                                    <h5 className="text-muted mt-1 mb-2 fw-normal">Courses</h5>
                                    <h2 className="mb-0 fw-bold">87</h2>
                                </div>
                                <div className="col-4">
                                    <h5 className="text-muted mt-1 mb-2 fw-normal">Comments</h5>
                                    <h2 className="mb-0 fw-bold">98</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end col*/}
                <div className="col-xl-7">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div>
                                <h4>Lessons:</h4>
                            </div>
                            {/* Lesson Box*/}
                            <div className="border border-light px-2 mb-3">
                                <div className="post-user-comment-box">
                                    <div className='row'>
                                        <div className='col-sm-2'>
                                            <img
                                                className="me-2 img-fluid"
                                                src="https://thumbs.dreamstime.com/z/lesson-plan-businessman-drawing-landing-page-blurred-abstract-background-71124919.jpg"
                                                alt="Generic placeholder image"
                                            />
                                        </div>
                                        <div className='col-sm-3'>
                                            <div className="w-100">
                                                <h5 className="mt-0">
                                                    Free HTML Lesson
                                                </h5>
                                                Free HTML Lesson for beginners.
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>Courses:</h4>
                            </div>
                            {/* Course Box*/}
                            <div className="border border-light px-2 mb-3">
                                <div className="post-user-comment-box">
                                    <div className='row'>
                                        <div className='col-sm-2'>
                                            <img
                                                className="me-2 img-fluid"
                                                src="https://cdn.mos.cms.futurecdn.net/Vp9WvV7YKdH4k8sKRePcE8.jpg"
                                                alt="Generic placeholder image"
                                            />
                                        </div>
                                        <div className='col-sm-3'>
                                            <div className="w-100">
                                                <h5 className="mt-0">
                                                    Free CSS Course
                                                </h5>
                                                Free CSS Lessons for beginners.
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>Comments:</h4>
                            </div>
                            {/* Comment Box*/}
                            <div className="border border-light px-2 mb-3">
                                <div className="post-user-comment-box">
                                    <div className="d-flex align-items-start">
                                        <img
                                            className="me-2 avatar-sm rounded-circle"
                                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                            alt="Generic placeholder image"
                                        />
                                        <div className="w-100">
                                            <h5 className="mt-0">
                                                Jeremy Tomlinson
                                            </h5>
                                            Nice work, makes me think of The Money Pit.
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Comment Box*/}
                            <div className="border border-light px-2 mb-3">
                                <div className="post-user-comment-box">
                                    <div className="d-flex align-items-start">
                                        <img
                                            className="me-2 avatar-sm rounded-circle"
                                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                            alt="Generic placeholder image"
                                        />
                                        <div className="w-100">
                                            <h5 className="mt-0">
                                                Jeremy Tomlinson
                                            </h5>
                                            Nice work, makes me think of The Money Pit.
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end card*/}
                </div>
                {/* end col */}
            </div>
            {/* end row*/}
        </div>
    )
}