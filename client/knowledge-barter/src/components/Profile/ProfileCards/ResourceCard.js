import { Link } from "react-router-dom"

export const ResourceCard = (props) => {
    return (
        <Link to={props.link} style={{textDecoration: 'none'}}>
            <div className="border border-light px-2 mb-3">
                <div className="post-user-comment-box">
                    <div className='row'>
                        <div className='col-sm-2'>
                            <img
                                className="me-2 img-fluid"
                                src={props.thumbnail}
                                alt="Generic placeholder image"
                            />
                        </div>
                        <div className='col-sm-3'>
                            <div className="w-100">
                                <h5 className="mt-0">
                                    {props.title}
                                </h5>
                                {props.description}
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}