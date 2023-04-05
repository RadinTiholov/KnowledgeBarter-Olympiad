import { Link } from "react-router-dom"
import "../ChatHub.css"

export const ProfileCard = (props) => {
    return (
        // <div className="card comment-card card-display-details mx-5 my-2">
        //     <Link to={`/chat?receiver=${props.userName}`}>
        //         <div className="row">
        //             <div className="col-1">
        //                 <img
        //                     className="img-fluid rounded-circle profile-comment m-3"
        //                     src={`${props.imageUrl}`}
        //                     alt="Lesson Pic"
        //                     style={{ objectFit: 'contain' }}
        //                 />
        //             </div>
        //             <div className="col-11">
        //                 <p className="mt-4">{props.userName}</p>
        //             </div>
        //         </div>
        //         <div className="row mx-3">
        //         </div>
        //     </Link>
        // </div>
        <div className="card-body no-padding">
            <div className="item d-flex align-items-center">
                    <div className="image">
                        <img
                            src={`${props.imageUrl}`}
                            alt="User pic"
                            className="img-fluid rounded-circle"
                        />
                    </div>
                    <div className="text">
                        <h3 className="h5">{props.userName}</h3>
                    </div>
            </div>
        </div >
        // <div className="card-body no-padding">
        //     <div className="item d-flex align-items-center">
        //         <div className="image">
        //             <img
        //                 src="https://bootdey.com/img/Content/avatar/avatar3.png"
        //                 alt="..."
        //                 className="img-fluid rounded-circle"
        //             />
        //         </div>
        //         <div className="text">
        //             <a href="#">
        //                 <h3 className="h5">Lorem Ipsum Dolor</h3>
        //             </a>
        //         </div>
        //     </div>
        // </div>
    )
}