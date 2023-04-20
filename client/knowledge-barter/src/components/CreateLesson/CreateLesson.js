import './CreateLesson.css'
import 'draft-js/dist/Draft.css';
import { EditorState} from 'draft-js';
import background from '../../images/waves-login.svg'
import { useContext, useState } from 'react';
import * as lessonsService from '../../dataServices/lessonsService'
import { useNavigate } from 'react-router-dom';
import { LessonContext } from '../../contexts/LessonContext';
import { AuthContext } from '../../contexts/AuthContext';
import DropboxChooser from 'react-dropbox-chooser';
import { onSelectFile } from '../../infrastructureUtils/fileSelectionUtils';
import { getVideoId, getRawEditorState, getHtmlEditorRaw} from '../../infrastructureUtils/commonUtils';
import { isPositiveLength, isValidForm, minMaxValidator, urlYoutubeValidator } from '../../infrastructureUtils/validationUtils';
import RichStylingEditor from '../RichStylingEditor/RichStylingEditor';
import DOMPurify from 'dompurify'

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const CreateLesson = () => {
    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        article: "",
        video: "",
        tags: [],
        resources: "",
    });

    const [imageData, setImageData] = useState({
        imageFile: '',
    });

    const [visualizationImageUrl, setVisualizationImageUrl] = useState('');

    const navigate = useNavigate();
    const { create } = useContext(LessonContext)
    const { updatePoints } = useContext(AuthContext);
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
            else if (e.target.name === 'video') {
                const videoId = getVideoId(e.target.value);
                if (videoId) {
                    return { ...state, [e.target.name]: 'https://www.youtube.com/embed/' + videoId }
                } else {
                    return { ...state, [e.target.name]: e.target.value }
                }
            }
            else {
                return { ...state, [e.target.name]: e.target.value }
            }
        })
    }

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    const onSubmit = (e) => {
        e.preventDefault();

        const articleStateAsJson = JSON.parse(getRawEditorState(editorState));
        const articleStateAsHtml = getHtmlEditorRaw(articleStateAsJson);
        const articleLength = editorState.getCurrentContent().getPlainText('\u0001').length;

        if (articleLength < 50 || articleLength > 1000 ) {
            setError({message: "The length of the article must be a minimum of 50 and a maximum of 1000 characters.", active: true});
            return;
        }

        // Start spinner
        setIsLoading(true);

        const formData = new FormData(e.target);

        formData.append('resources', inputData.resources);
        formData.append('article', DOMPurify.sanitize(articleStateAsHtml));

        const tagString = formData.get('tags').replace(/\s/g, '');
        let tags = tagString.split(',');
        tags = tags.filter(x => x !== '');

        formData.delete('tags');

        // Append the tags to the formData
        for (var i = 0; i < tags.length; i++) {
            formData.append('tags', tags[i]);
        }

        lessonsService.create(formData)
            .then(res => {
                create(res);
                updatePoints(100);

                // Stop spinner
                setIsLoading(false);

                toast.success('Successfully created lesson!', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                navigate('/lesson/details/' + res.id)
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
            {/* Create lesson form */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-bold fs-5">
                                    Create Lesson
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
                                        <label htmlFor="title">Title</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.title &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                The length of the title must be a minimum of 3 and a maximum of 20 characters.
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
                                        <label htmlFor="description">Description</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.description &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                The length of the description must be a minimum of 10 and a maximum of 60 characters.
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
                                        <label htmlFor="video">Video Link</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.video &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                Please provide youtube video.
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
                                            Choose lesson Image
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
                                                The allowed extenstions are jpeg, jpg and png.
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
                                        <label htmlFor="tags">Tags (split them by comma ",")</label>
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
                                                <div className="dropbox-button btn btn-outline-warning" style={{ backgroundColor: "#636EA7" }}>Upload here</div>
                                            </DropboxChooser>
                                        </div>
                                    </div>
                                    {/* <div className="form-control mb-3">
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
                                        <label htmlFor="article">Article</label>
                                    </div> */}
                                    <RichStylingEditor editorState={editorState} setEditorState={setEditorState} />
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
                                        <strong>{t("error")}</strong> {error.message}
                                    </div> : null}
                                    <div className="d-grid mt-3">
                                        <button
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            type="submit"
                                            disabled={isLoading || !isValidForm(errors) || (!inputData.title || !inputData.description || !inputData.video || !(editorState.getCurrentContent().getPlainText('\u0001').length > 50 && !editorState.getCurrentContent().getPlainText('\u0001').length < 1000) || !imageData.imageFile || !inputData.tags.length > 0)}
                                        >
                                            {isLoading
                                                ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true" />
                                                : <></>}
                                            {t("create")}
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