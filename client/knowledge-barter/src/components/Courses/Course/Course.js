import { useTranslation } from 'react-i18next'
import {Link} from 'react-router-dom'
export const Course = (props) => {
    const { t } = useTranslation();

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
                    <div className='row'>
                        <h5 className="fw-bold text-start">{props.title}</h5>
                        <p className="fs-6 fw-light text-start">{props.ownerName}</p>
                    </div>
                    <div className='row'>
                        <div className='col-4'>
                            <Link
                                to={"/course/details/" + props.id + '/' + props.lessons[0]}
                                className="btn"
                                style={{ backgroundColor: "#636EA7", color: "#fff" }}
                            >
                                {t("details")}
                            </Link>
                        </div>
                        <div className='col-8 mt-1 d-flex justify-content-evenly align-items-center'>
                            <i className="fa-solid fa-thumbs-up fa-xl"/><span className="fw-bold"> {props.likes} </span>
                            <i className="fa-solid fa-comment fa-xl"/><span className="fw-bold"> {props.comments}</span>
                        </div>
                    </div>
                </div>
        </div>
    </div>  
    )
}