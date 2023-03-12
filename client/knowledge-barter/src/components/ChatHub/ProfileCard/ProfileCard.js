export const ProfileCard = (props) => {
    return (
        <div className="card comment-card card-display-details mx-5 my-2">
            <div className="row">
                <div className="col-1">
                    <img
                        className="img-fluid rounded-circle profile-comment m-3"
                        src={`${props.imageUrl}`}
                        alt="Lesson Pic"
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <div className="col-11">
                    <p className="mt-4">{props.userName}</p>
                </div>
            </div>
            <div className="row mx-3">
            </div>
        </div>
    )
}