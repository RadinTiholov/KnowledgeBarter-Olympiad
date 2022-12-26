export const Comment = (props) => {
  return (
      <div
          className="card card-display-details mx-5 my-2"
          style={{ height: 150, width: 900 }}
      >
          <div className="row">
              <div className="col-1">
                  <img
                      className="img-fluid rounded-circle profile-comment m-3"
                      src={props.commentedUsers[0]?.profilePicture}
                      alt="Lesson Pic"
                  />
              </div>
              <div className="col-11">
                  <p className="mt-4">{props.commentedUsers[0]?.username}</p>
              </div>
          </div>
          <div className="row mx-3">
              <h5>{props.text}</h5>
          </div>
      </div>
  )
}