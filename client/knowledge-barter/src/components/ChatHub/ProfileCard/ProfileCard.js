import { Link } from "react-router-dom"
import "../ChatHub.css"

export const ProfileCard = (props) => {
    return (
        <div className="item-color no-padding mx-3">
            <Link to={`/chat?receiver=${props.userName}`}>
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
            </Link>
        </div >
    )
}