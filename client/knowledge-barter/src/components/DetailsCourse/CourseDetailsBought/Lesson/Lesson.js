import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const Lesson = (props) => {
    const { t } = useTranslation();
    
    return (
        <div className="row mb-2">
            <div className="card card-display-details" style={{ width: "15rem" }}>
                <img
                    src={props.thumbnail}
                    className="card-img mt-2"
                    style={{ height: "7rem" }}
                    alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title fw-bold">{props.title}</h5>
                    <Link
                        to={"/course/details/" + props.courseId + '/' + props.id}
                        className="btn"
                        style={{ backgroundColor: "#f0ad4e", color: "#fff" }}
                    >
                        {t("details")}
                    </Link>
                </div>
            </div>
        </div>
    )
}