import { useNavigate, useParams } from 'react-router-dom';
import { useBoughtLesson } from "../../hooks/useBoughtLesson";
import { useLessonsWithUser } from "../../hooks/useLessonsWithUser";
import { useOwner } from "../../hooks/useOwner";
import { LessonDetailsBought } from "./LessonDetailsBought/LessonDetailsBought";
import { LessonDetailsPreview } from "./LessonDetailsPreview/LessonDetailsPreview";
import * as lessonService from '../../dataServices/lessonsService'
import { useContext, useEffect, useState } from 'react';
import { LessonContext } from '../../contexts/LessonContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useCurrentUserInfo } from '../../hooks/useCurrentUserInfo'
import { useIsLiked } from '../../hooks/useIsLiked';
import { BookSpinner } from '../common/Spinners/BookSpinner';
import { toast } from 'react-toastify';

export const DetailsLesson = () => {
    const { id } = useParams();
    const { lesson, setLesson, owner, isLoadingLesson } = useLessonsWithUser(id);
    const navigate = useNavigate();
    const [isOwner, isLoadingOwner] = useOwner(id, true);
    const [isBought, isLoadingBoughtLeson] = useBoughtLesson(id);
    const [fullUserInfo, setfullUserInfo] = useCurrentUserInfo({});
    const [isLiked, setIsLiked] = useIsLiked(id, true);
    const { delLesson, like } = useContext(LessonContext);
    const { auth, updatePoints } = useContext(AuthContext);
    const [recommendedLessons, setRecommendedLessons] = useState([]);

    useEffect(() => {
        if (auth !== null) {
            lessonService.recommended()
                .then(res => setRecommendedLessons(res))
                .catch(err => alert(err))
        }
    }, [])

    const onClickDelete = () => {
        lessonService.del(id)
            .then(res => {
                delLesson(id);
                navigate('/lesson/all');

                toast.success('Successfully deleted lesson!', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }).catch(err => {
                alert(err);
            })
    }
    const buyLessonOnClick = () => {
        if (auth.kbPoints >= lesson.price) {
            lessonService.buy(id)
                .then(res => {
                    navigate('/lesson/bought');
                    updatePoints(-100);

                    toast.success('Successfully bought!', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }).catch(err => {
                    alert(err);
                })
        } else {
            alert("You don't have enough KBPoints")
        }
    }
    const likeLessonOnClick = () => {
        lessonService.like(id)
            .then(res => {
                like(id)
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
                alert(err);
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
            {isLoadingLesson || isLoadingOwner || isLoadingBoughtLeson
                ? <div className="pt-5">
                    <BookSpinner />
                </div>
                : isBought || isOwner ? <LessonDetailsBought
                    lesson={lesson}
                    onClickDelete={onClickDelete}
                    likeLessonOnClick={likeLessonOnClick}
                    isOwner={isOwner}
                    isLiked={isLiked}
                    comment={comment}
                    recommendedLessons={!Array.isArray(recommendedLessons) ? [] : recommendedLessons} />
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