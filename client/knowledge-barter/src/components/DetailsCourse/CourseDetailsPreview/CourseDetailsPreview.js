import './CourseDetailsPreview.css'
import background from '../../../images/waves-details.svg'

export const CourseDetailsPreview = (props) => {
    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-details">
            {/* Login Form */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h1 className="card-title text-center mb-5 fw-bold">{props.course.title}</h1>
                                <img
                                    className="img-fluid rounded"
                                    src={props.course.thumbnail}
                                    alt="Lesson Pic"
                                />
                                <hr className="my-4" />
                                <p>{props.course.description}</p>
                                <hr className="my-1" />
                                <p>Creator: {props.owner.userName}</p>
                                <hr className="my-1" />
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    <i className="fa-solid fa-thumbs-up fa-2xl  mt-5" />
                                                    <span className="fw-bold">: {props.course.likes}</span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <i className="fa-solid fa-lightbulb fa-2xl  mt-5" />
                                                    <span className="fw-bold">: {props.course.price}$</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            {props.isAuth ? <>
                                                <div className="row">
                                                {props.isLiked ? <button
                                                    className="btn btn-outline-warning btn-lg mt-4 fw-bold"
                                                    style={{
                                                        backgroundColor: "#636EA7",
                                                        width: 130,
                                                        height: 50
                                                    }}
                                                    disabled = {true}
                                                >
                                                    Liked
                                                </button> :
                                                    <button
                                                        className="btn btn-outline-warning btn-lg mt-4 fw-bold"
                                                        style={{
                                                            backgroundColor: "#636EA7",
                                                            width: 130,
                                                            height: 50
                                                        }}
                                                        onClick={props.likeCourseOnClick}
                                                    >
                                                        Like
                                                    </button>}
                                            </div>
                                            <div className="row">
                                                <button
                                                    className="btn btn-outline-warning btn-lg mt-2 fw-bold"
                                                    style={{
                                                        backgroundColor: "#636EA7",
                                                        width: 130,
                                                        height: 50
                                                    }}
                                                    onClick={props.buyCourseOnClick}
                                                >
                                                    Buy ({props.course.price})
                                                </button>
                                            </div></> : null}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}