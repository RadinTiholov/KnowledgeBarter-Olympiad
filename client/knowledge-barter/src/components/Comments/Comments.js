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
        <div className="rounded table-container">
            <table className="w-100 table-responsive rounded table table-dark table-striped table-hover my-0 pb-3">
                <thead>
                    <tr className="">
                        <th scope="col">User</th>
                        <th scope="col">Lesson</th>
                        <th scope="col">Comment</th>
                        <th scope="col">AI's Opinion <i className="fa-solid fa-robot" /></th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(x => <CommentRow key={x.id} {...x} onClickDelete={onClickDelete} />)}
                </tbody>
            </table>
        </div>
    )
}