import {Link} from 'react-router-dom'
export const Course = (props) => {
    return (
        <div className="col">
        <div className="card card-display border-0 zoom" style={{ width: "15rem", margin: 'auto' }}>
            <img
                src={props.thumbnail}
                className="card-img"
                style={{ height: "15rem" }}
                alt="..."
            />
            <div className="card-body">
                <h5 className="card-title fw-bold">{props.title}</h5>
                <Link
                    to={"/course/details/" + props.id+ "/" + props.lessons[0].id}
                    className="btn"
                    style={{ backgroundColor: "#636EA7", color: "#fff" }}
                >
                    Details
                </Link>
            </div>
        </div>
    </div>  
    )
}