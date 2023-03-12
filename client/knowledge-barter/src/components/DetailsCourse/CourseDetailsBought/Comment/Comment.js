import { Link } from "react-router-dom"

export const Comment = (props) => {
    return (
        <div className="card comment-card card-display-details mx-5 my-2">
            <div className="row">
                <div className="col-1">
                    <Link
                        to={`/chat?receiver=${props.userName}`}
                    >
                        <img
                            className="img-fluid rounded-circle profile-comment m-3"
                            src={props.profilePicture}
                            alt="Lesson Pic"
                            style={{ objectFit: 'contain' }}
                        />
                    </Link>
                </div>
                <div className="col-11">
                    <Link
                        to={`/chat?receiver=${props.userName}`}
                        style={{ textDecoration: "none" }}
                    >
                        <p className="mt-4">{props.userName}</p>
                    </Link>
                </div>
            </div>
            <div className="row mx-3">
                <h5>{props.text}</h5>
            </div>
        </div>
    )
}