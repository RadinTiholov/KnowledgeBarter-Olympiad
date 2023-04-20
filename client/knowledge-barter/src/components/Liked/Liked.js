import { useTranslation } from 'react-i18next';
import { useCollectionInfo } from '../../hooks/useCollectionInfo';
import { BookSpinner } from '../common/Spinners/BookSpinner';
import { Course } from './Course/Course';
import { Lesson } from './Lesson/Lesson'
import './Liked.css'

export const Liked = () => {
    const [collectionLesson, isLoadingLessons] = useCollectionInfo('likedLessons');
    const [collectionCourses, isLoadingCourses] = useCollectionInfo('likedCourses');

    const { t } = useTranslation();

    return (
        <>
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5 text-center">{t("liked")}</h1>
            </div>
            {isLoadingLessons === true || isLoadingCourses === true ?
                <BookSpinner />
                : <div className="container">
                    <div className="text-center">
                        <div className="row row-cols-5 gy-3 pb-5 pt-3">
                            {collectionLesson.length > 0 ? collectionLesson?.map(x => <Lesson {...x} key={x.id} />) : <h3 className='text-center'>No lessons yet.</h3>}
                            {collectionCourses.length > 0 ? collectionCourses?.map(x => <Course {...x} key={x.id} />) : <h3 className='text-center'>No courses yet.</h3>}
                        </div>
                    </div>
                </div>}
        </>
    )
}