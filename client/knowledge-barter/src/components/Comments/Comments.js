import { useEffect, useState } from "react"
import * as commentsService from "../../dataServices/commentsService";
import { CommentRow } from "./CommentRow/CommentRow";
import { useTranslation } from "react-i18next";

export const Comments = () => {

    const [comments, setComments] = useState([]);

    const { t } = useTranslation();

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
                        <th scope="col">{t("user")}</th>
                        <th scope="col">{t("lesson")}</th>
                        <th scope="col">{t("comment")}</th>
                        <th scope="col">{t("aiOp")} <i className="fa-solid fa-robot" /></th>
                        <th scope="col">{t("actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(x => <CommentRow key={x.id} {...x} onClickDelete={onClickDelete} />)}
                </tbody>
            </table>
        </div>
    )
}