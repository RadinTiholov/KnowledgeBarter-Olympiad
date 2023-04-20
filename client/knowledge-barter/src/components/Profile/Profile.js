import './Profile.css'
import coinImage from '../../images/coin-image.webp'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { LessonContext } from '../../contexts/LessonContext'
import { CourseContext } from '../../contexts/CourseContext'
import { Link, useParams } from 'react-router-dom'
import { useSelectedUserInfor } from '../../hooks/useSelectedUserInfo'
import { ResourceCard } from './ProfileCards/ResourceCard'
import { CommentCard } from './ProfileCards/CommentCard'
import { BookSpinner } from '../common/Spinners/BookSpinner'
import { useTranslation } from 'react-i18next'

export const Profile = () => {
    const { id } = useParams();

    const { t } = useTranslation();

    const [fullUserInfo, setfullUserInfo, isLoading] = useSelectedUserInfor(id)
    const { auth } = useContext(AuthContext);
    const { lessons } = useContext(LessonContext);
    const { courses } = useContext(CourseContext);

    return (
        <div className="container py-3">
            {!isLoading ?
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
                                        {fullUserInfo.id !== auth._id ?
                                            <Link to={`/chat?receiver=${fullUserInfo.username}`}
                                                type="button"
                                                className='btn'
                                                style={{ backgroundColor: "#636EA7", color: "#fff" }}
                                            >
                                                {t("message")}
                                            </Link> :
                                            <Link to={"/profile/update"} className="btn btn-outline-warning" style={{ backgroundColor: "#636EA7" }}>
                                                {t("edit")}
                                            </Link>}

                                    </div>
                                </div>
                            </div>
                        </div>
                        {fullUserInfo.id === auth._id ?
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
                                            <div className='col-6 text-start mt-2'>
                                                <h3>{t("kBPoints")}: {auth.kbPoints}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <></>}
                        <div className="card mb-3">
                            <div className="card-body text-center">
                                <div className="row">
                                    <div className="col-4 border-end border-light">
                                        <h5 className="text-muted mt-1 mb-2 fw-normal">{t("lessons")}</h5>
                                        <h2 className="mb-0 fw-bold">{fullUserInfo?.ownLessons?.length}</h2>
                                    </div>
                                    <div className="col-4 border-end border-light">
                                        <h5 className="text-muted mt-1 mb-2 fw-normal">{t("courses")}</h5>
                                        <h2 className="mb-0 fw-bold">{fullUserInfo?.ownCourses?.length}</h2>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="text-muted mt-1 mb-2 fw-normal">{t("comments")}</h5>
                                        <h2 className="mb-0 fw-bold">{fullUserInfo?.comments?.length}</h2>
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
                                    <h4>{t("lessons")}:</h4>
                                </div>
                                {/* Lesson Box*/}
                                {lessons.filter(x => x.owner === fullUserInfo.id).length > 0
                                    ? lessons.filter(x => x.owner === auth._id)?.map(x => <ResourceCard {...x} key={x.id} link={`/lesson/details/${x.id}`} />)
                                    : <p className='text-center'>{t("noLessonsYet")}</p>}
                                <div>
                                    <h4>{t("courses")}:</h4>
                                </div>
                                {/* Course Box*/}
                                {courses.filter(x => x.owner === fullUserInfo.id).length > 0
                                    ? courses.filter(x => x.owner === auth._id)?.map(x => <ResourceCard {...x} key={x.id} link={`/course/details/${x.id}/1`} />)
                                    : <p className='text-center'>{t("noCoursesYet")}</p>}
                                <div>
                                    <h4>{t("comments")}:</h4>
                                </div>
                                {/* Comment Box*/}
                                {fullUserInfo?.comments?.length > 0
                                    ? fullUserInfo?.comments?.map(x => <CommentCard {...x} key={x.id} />)
                                    : <p className='text-center'>{t("noCommentsYet")}</p>}
                            </div>
                        </div>
                        {/* end card*/}
                    </div>
                    {/* end col */}
                </div>
                : <BookSpinner />}
        </div>
    )
}