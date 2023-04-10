import { Link } from 'react-router-dom';

export const Card = (props) => {
    return (
        <div className="col">
            <div className="card card-display frost border-0" style={{ margin: "auto", width: "15rem" }}>
                <img
                    src={props.thumbnail}
                    className="card-img"
                    style={{ height: "15rem" }}
                    alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title fw-bold">{props.title}</h5>
                    {props.route === '/course/details/' ? <Link
                        to={props.route + props.id + '/' + props.lessons[0]}
                        className="btn"
                        style={{ backgroundColor: "#636EA7", color: "#fff" }}
                    >
                        Details
                    </Link> :
                        <Link
                            to={props.route + props.id}
                            className="btn"
                            style={{ backgroundColor: "#636EA7", color: "#fff" }}
                        >
                            Details
                        </Link>}
                </div>
            </div>
        </div>
    )
}