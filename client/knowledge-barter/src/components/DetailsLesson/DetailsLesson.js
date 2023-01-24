import { useNavigate, useParams } from 'react-router-dom';
import { useBoughtLesson } from "../../hooks/useBoughtLesson";
import { useLessonsWithUser } from "../../hooks/useLessonsWithUser";
import { useOwner } from "../../hooks/useOwner";
import { LessonDetailsBought } from "./LessonDetailsBought/LessonDetailsBought";
import { LessonDetailsPreview } from "./LessonDetailsPreview/LessonDetailsPreview";
import * as lessonService from '../../services/lessonsService'
import { useContext, useEffect, useState } from 'react';
import { LessonContext } from '../../contexts/LessonContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useUserInfo } from '../../hooks/useUserInfo'
import { useIsLiked } from '../../hooks/useIsLiked';

export const DetailsLesson = () => {
    const { id } = useParams();
    const { lesson, setLesson, owner } = useLessonsWithUser(id);
    const navigate = useNavigate();
    const [isOwner] = useOwner(id, true);
    const [isBought] = useBoughtLesson(id);
    const [fullUserInfo, setfullUserInfo] = useUserInfo({})
    const [isLiked, setIsLiked] = useIsLiked(id, true);
    const { delLesson } = useContext(LessonContext)
    const { auth, updatePoints } = useContext(AuthContext)
    const [mostPopularLessons, setMostPopularLessons] = useState([]);
    useEffect(() => {
        lessonService.getPopular()
            .then(res => setMostPopularLessons(res))
            .catch(err => alert(err))
    }, [])
    const onClickDelete = () => {
        lessonService.del(id)
            .then(res => {
                delLesson(id)
                navigate('/lesson/all')
            }).catch(err => {
                alert(err)
            })
    }
    const buyLessonOnClick = () => {
        if (auth.kbPoints >= lesson.price) {
            lessonService.buy(id)
                .then(res => {
                    navigate('/lesson/bought')
                    updatePoints(-100)
                }).catch(err => {
                    alert(err)
                })
        } else {
            alert("You don't have enough KBPoints")
        }
    }
    const likeLessonOnClick = () => {
        lessonService.like(id)
            .then(res => {
                setIsLiked(true);
                setLesson(state => {
                    let temp = { ...state }
                    temp.likes++;
                    return temp
                })
                setfullUserInfo(state => {
                    let temp = { ...state }
                    temp.likedLessons.push(id);
                    return temp
                })
            })
            .catch(err => {
                alert(err)
            })
    }
    const comment = (comment) => {
        setLesson(state => {
            let temp = { ...state }
            temp.comments.push(comment)
            return temp
        })
    }
    return (
        <>
            {isBought || isOwner ? <LessonDetailsBought
                    lesson={lesson}
                    owner={owner}
                    onClickDelete={onClickDelete}
                    likeLessonOnClick={likeLessonOnClick}
                    isOwner={isOwner}
                    isLiked={isLiked}
                    comment={comment}
                    mostPopularLessons={!Array.isArray(mostPopularLessons) ? [] : mostPopularLessons} />
                : <LessonDetailsPreview
                    lesson={lesson}
                    owner={owner}
                    buyLessonOnClick={buyLessonOnClick}
                    likeLessonOnClick={likeLessonOnClick}
                    isLiked={isLiked}
                    isAuth={auth} />}
        </>
    )
}