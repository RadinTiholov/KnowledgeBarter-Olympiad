export const CommentCard = (props) => {
    return (
        <div className="border border-light px-2 mb-3">
            <div className="post-user-comment-box">
                <div className="d-flex align-items-start">
                    <img
                        className="me-2 avatar-sm rounded-circle"
                        src={props.profilePicture}
                        alt="Generic placeholder image"
                    />
                    <div className="w-100">
                        <h5 className="mt-0">
                            {props.userName}
                        </h5>
                        {props.text}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}