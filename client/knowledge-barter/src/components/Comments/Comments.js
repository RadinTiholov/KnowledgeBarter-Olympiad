import { useEffect, useState } from "react"
import * as commentsService from "../../dataServices/commentsService";
import { CommentRow } from "./CommentRow/CommentRow";

export const Comments = () => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        commentsService.getAll()
            .then(res => setComments(res))
            .catch(err => alert(err));
    }, [])

    const onClickDelete = (id) => {
        commentsService.del(id)
            .then(res => {
                setComments(state => comments.filter(x => x.id !== Number(id)));
            }).catch(err => {
                alert(err)
            })
    }

    return (
            <table className="table table-hover  my-5">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">User</th>
                        <th scope="col">Lesson</th>
                        <th scope="col">Comment</th>
                        <th scope="col">AI's Opinion <i className="fa-solid fa-robot" /></th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(x => <CommentRow key = {x.id} {...x} onClickDelete = {onClickDelete}/>)}
                </tbody>
            </table>
    )
}