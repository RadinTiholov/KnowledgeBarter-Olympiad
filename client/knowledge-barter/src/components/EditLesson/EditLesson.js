import './EditLesson.css'
import background from '../../images/waves-login.svg'
import { useContext, useEffect, useState } from 'react';
import * as lessonsService from '../../dataServices/lessonsService'
import { useNavigate, useParams } from 'react-router-dom';
import { LessonContext } from '../../contexts/LessonContext';
import DropboxChooser from 'react-dropbox-chooser';
import { onSelectFile } from '../../infrastructureUtils/fileSelectionUtils';
import { isPositiveLength, isValidForm, minMaxValidator, urlYoutubeValidator } from '../../infrastructureUtils/validationUtils';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';

export const EditLesson = () => {
    const { id } = useParams();

    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        article: "",
        video: "",
        tags: [],
        resources: "",
    });

    const [visualizationImageUrl, setVisualizationImageUrl] = useState('');

    const [imageData, setImageData] = useState({
        imageFile: '',
    });

    useEffect(() => {
        lessonsService.getDetails(id)
            .then(res => {
                setInputData(res);

                setVisualizationImageUrl(res.thumbnail);
            })
    }, [])

    const navigate = useNavigate();
    const { update } = useContext(LessonContext)
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        image: false,
        article: false,
        video: false,
        tags: false,
        resources: false,
    })

    const [error, setError] = useState({ active: false, message: "" });

    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    const onChange = (e) => {
        setInputData(state => {
            if (e.target.name === 'tags') {
                const newValue = { ...state };
                newValue.tags = e.target.value.split(',');
                return newValue;
            }
            else {
                return { ...state, [e.target.name]: e.target.value }
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // Start spinner
        setIsLoading(true);

        let formData = new FormData(e.target);

        formData.append('resources', inputData.resources ? inputData.resources : '');
        formData.delete('article');
        formData.append('article', DOMPurify.sanitize(inputData.article));

        lessonsService.update(formData, id)
            .then(res => {
                update(res)

                // Stop spinner
                setIsLoading(false);
                navigate('/lesson/details/' + id)

                toast.success('Successfully edited lesson!', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(err => {
                setError({ active: true, message: err.message })
                
                // Stop spinner
                setIsLoading(false);
            })
    }

    const onSuccessfullyUploaded = (file) => {
        setInputData(state => {
            const newValue = { ...state };
            newValue.resources = file[0].link;
            return newValue;
        })
    }

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-create">
            {/* Login Form */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-bold fs-5">
                                    {t("editLesson")}
                                </h5>
                                <form onSubmit={onSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            id="title"
                                            placeholder="Some title"
                                            value={inputData.title}
                                            onChange={onChange}
                                            onBlur={(e) => minMaxValidator(e, 3, 20, setErrors, inputData)}
                                        />
                                        <label htmlFor="title">{t("title")}</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.title &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                {t("titleValMs")}
                                            </div>
                                        </div>}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            id="description"
                                            placeholder="Some description"
                                            value={inputData.description}
                                            onChange={onChange}
                                            onBlur={(e) => minMaxValidator(e, 10, 60, setErrors, inputData)}
                                        />
                                        <label htmlFor="description">{t("description")}</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.description &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                {t("descriptionValMs")}
                                            </div>
                                        </div>}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="video"
                                            id="video"
                                            placeholder="Some link"
                                            value={inputData.video}
                                            onChange={onChange}
                                            onBlur={(e) => urlYoutubeValidator(e, setErrors, inputData)}
                                        />
                                        <label htmlFor="video">{t("videoLink")}</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.video &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                {t("provideYoutube")}
                                            </div>
                                        </div>}
                                    {/* Image */}
                                    <div>
                                        <input
                                            className='form-control'
                                            type='file'
                                            name='image'
                                            onChange={e => onSelectFile(e, setImageData, setVisualizationImageUrl, setErrors)}
                                        />
                                        <label htmlFor='formFile' className='form-label'>
                                            {t("chooseAPicture")}
                                        </label>
                                    </div>
                                    {/* Alert */}
                                    {errors.image &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                {t("allowedExtensions")}
                                            </div>
                                        </div>}
                                    {visualizationImageUrl &&
                                        <>
                                            <img className='img-fluid mb-3' src={visualizationImageUrl} alt='img' style={{ height: 300 }} />
                                        </>
                                    }
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="tags"
                                            id="tags"
                                            placeholder="Tags"
                                            value={inputData.tags}
                                            onChange={onChange}
                                            onBlur={(e) => isPositiveLength(e, setErrors, inputData)}
                                        />
                                        <label htmlFor="tags">{t("tagsSplit")}</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.tags &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                {t("provideTags")}
                                            </div>
                                        </div>}
                                    <div className="form-control mb-3">
                                        <label htmlFor="resources">{t("resources")}</label>
                                        <div>
                                            <DropboxChooser
                                                appKey={"fp536edus6mtntt"}
                                                success={onSuccessfullyUploaded}
                                                multiselect={false}>
                                                <div className="dropbox-button btn btn-outline-warning" style={{ backgroundColor: "#636EA7" }}>{t("uploadHere")}</div>
                                            </DropboxChooser>
                                        </div>
                                    </div>
                                    <div className="form-control mb-3">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="article"
                                            id="article"
                                            rows={10}
                                            value={inputData.article}
                                            onChange={onChange}
                                            onBlur={(e) => minMaxValidator(e, 50, 1000, setErrors, inputData)}
                                        />
                                        <label htmlFor="article">{t("article")}</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.article &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                {t("minArticleMsg")}
                                            </div>
                                        </div>}
                                    {/* Error message */}
                                    {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong> {error.message}
                                    </div> : null}
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            type="submit"
                                            disabled={isLoading || !isValidForm(errors) || (!inputData.title || !inputData.description || !inputData.video || !inputData.article || !inputData.tags.length > 0)}
                                        >
                                            {isLoading
                                                ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true" />
                                                : <></>}
                                            {t("edit")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}