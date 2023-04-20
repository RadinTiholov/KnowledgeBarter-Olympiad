import { Lesson } from './Lesson/Lesson'
import './BoughtLessons.css'
import { useCollectionInfo } from '../../hooks/useCollectionInfo';
import { BookSpinner } from '../common/Spinners/BookSpinner';
import { useTranslation } from 'react-i18next';
export const BoughtLessons = () => {
    const { t } = useTranslation();

    const [collection, isLoading] = useCollectionInfo('boughtLessons');
    return (
        <>
            <img src="" className="" alt=""/>
            <div className="col text-xl-center">
                <h1 className="fw-bold mb-3 pt-5 text-center">{t("boughtLessons")}</h1>
            </div>
            {isLoading ?
                <BookSpinner /> :
                <div className="container">
                    <div className="text-center">
                        <div className="row row-cols-5 gy-3 pb-5 pt-3">
                            {collection.length > 0 ? collection?.map(x => <Lesson {...x} key={x.id} />) : <p className='text-center'>No lessons yet.</p>}
                        </div>
                    </div>
                </div>}
        </>
    )
}