import { Link } from "react-router-dom"

export const CommentRow = (props) => {
    return (
        <tr>
            <td>{props.userName}</td>
            <td>
                <Link to={`/lesson/details/${props.lessonId}`}>
                    {props.lessonTitle}
                </Link>
            </td>
            <td>{props.text}</td>
            <td>{props.prediction}</td>
            <td>
                <button className="btn btn-danger" onClick={() => { props.onClickDelete(props.id)} }>Delete</button>
            </td>
        </tr>
    )
}