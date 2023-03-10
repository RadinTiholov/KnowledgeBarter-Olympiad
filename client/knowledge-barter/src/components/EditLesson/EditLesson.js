import './EditLesson.css'
import background from '../../images/waves-login.svg'
import { useContext, useEffect, useState } from 'react';
import * as lessonsService from '../../dataServices/lessonsService'
import { useNavigate, useParams } from 'react-router-dom';
import { LessonContext } from '../../contexts/LessonContext';
import DropboxChooser from 'react-dropbox-chooser';
import { onSelectFile } from '../../infrastructureUtils/fileSelectionUtils';
import { isPositiveLength, isValidForm, minMaxValidator, urlYoutubeValidator } from '../../infrastructureUtils/validationUtils';

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

        lessonsService.update(formData, id)
            .then(res => {
                update(res)

                // Stop spinner
                setIsLoading(false);
                navigate('/lesson/details/' + id)
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
                                    Edit Lesson
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
                                                Please provide embedded youtube video.
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
                                                Please provide tags.
                                            </div>
                                        </div>}
                                    <div className="form-control mb-3">
                                        <label htmlFor="resources">Resources (optional)</label>
                                        <div>
                                            <DropboxChooser
                                                appKey={"fp536edus6mtntt"}
                                                success={onSuccessfullyUploaded}
                                                multiselect={false}>
                                                <div className="dropbox-button btn btn-outline-warning" style={{ backgroundColor: "#636EA7" }}>Upload here</div>
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
                                        <label htmlFor="article">Article</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.article &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                The length of the description must be a minimum of 50 and a maximum of 1000 characters.
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
                                            Update
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