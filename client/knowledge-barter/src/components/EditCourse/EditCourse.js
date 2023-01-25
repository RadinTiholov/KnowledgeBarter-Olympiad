import './EditCourse.css'
import background from '../../images/waves-login.svg'
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCollectionInfo } from '../../hooks/useCollectionInfo'
import { Option } from './Option/Option';
import { CourseContext } from '../../contexts/CourseContext'
import * as courseService from '../../dataServices/coursesService'
import { onSelectFile } from '../../infrastructureUtils/fileSelectionUtils';
import { isValidForm } from '../../infrastructureUtils/validationUtils';

export const EditCourse = () => {
    const [collection] = useCollectionInfo('ownLessons');
    const navigate = useNavigate();
    const { update } = useContext(CourseContext);

    const { id } = useParams();

    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        tumbnail: "",
        lessons: []
    });

    const [visualizationImageUrl, setVisualizationImageUrl] = useState('');

    const [imageData, setImageData] = useState({
        imageFile: '',
    });

    useEffect(() => {
        courseService.getDetails(id)
            .then(res => {
                setInputData(res);
                setVisualizationImageUrl(res.thumbnail);
            })
    }, []);

    const [errors, setErrors] = useState({
        title: false,
        description: false,
        image: false,
        lessons: false
    });

    const [error, setError] = useState({ active: false, message: "" });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        for (let i = 0; i < collection?.length; i++) {
            if (formData.get(collection[i].id) !== null) {
                formData.append("lessons", formData.get(collection[i].id))
            }
        }

        if (collection?.length < 6) {
            setError({ active: true, message: "You need at least 6 lessons to create a course." });
        } else {
            courseService.update(formData, id)
                .then(res => {
                    update(res)
                    navigate('/course/details/' + id + '/' + res.lessons[0].id)
                })
                .catch(err => {
                    setError({ active: true, message: err.message })
                })
        }
    }

    const minMaxValidator = (e, min, max) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData[e.target.name].length < min || inputData[e.target.name].length > max }))
    }

    return (<div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-login">
        {/* Login Form */}
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-bold fs-5">
                                Edit Course
                            </h5>
                            <form onSubmit={onSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        id="title"
                                        placeholder="Some title"
                                        onChange={onChange}
                                        value={inputData.title}
                                        onBlur={(e) => minMaxValidator(e, 3, 20)}
                                    />
                                    <label htmlFor="title">Title</label>
                                </div>
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
                                        onChange={onChange}
                                        value={inputData.description}
                                        onBlur={(e) => minMaxValidator(e, 10, 60)}
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

                                {/* Image */}
                                <input
                                    className='form-control'
                                    type='file'
                                    name='image'
                                    onChange={e => onSelectFile(e, setImageData, setVisualizationImageUrl, setErrors)}
                                />
                                <label htmlFor='formFile' className='form-label'>
                                    Choose lesson Image
                                </label>
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
                                        <img className='img-fluid' src={visualizationImageUrl} alt='img' style={{ height: 300 }} />
                                    </>
                                }

                                <h5>Your lessons</h5>
                                <div className="form-floating mb-3">
                                    {collection.length > 0 ? collection?.map(x => <Option {...x} key={x.id} onChange={onChange} isSelected={inputData.lessons.some(y => y.id === x.id)} />) : <p className='text-center'>No lessons yet.</p>}
                                    {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong> {error.message}
                                    </div> : null}
                                    {collection?.length < 6 ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong>You need at least 6 lessons to create a course.
                                    </div> : null}
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn btn-outline-warning"
                                        style={{ backgroundColor: "#636EA7" }}
                                        type="submit"
                                        disabled={!isValidForm(errors) || (!inputData.title || !inputData.description || collection?.length < 6)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}