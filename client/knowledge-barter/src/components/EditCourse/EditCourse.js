import './EditCourse.css'
import background from '../../images/waves-login.svg'
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Option } from './Option/Option';
import { CourseContext } from '../../contexts/CourseContext'
import * as courseService from '../../dataServices/coursesService'
import { onSelectFile } from '../../infrastructureUtils/fileSelectionUtils';
import { isValidForm, minMaxValidator } from '../../infrastructureUtils/validationUtils';
import { LessonContext } from '../../contexts/LessonContext';
import { toast } from 'react-toastify';

export const EditCourse = () => {
    const navigate = useNavigate();
    const { update } = useContext(CourseContext);
    const { lessons } = useContext(LessonContext);

    const { id } = useParams();

    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        tumbnail: "",
        lessons: []
    });

    const [visualizationImageUrl, setVisualizationImageUrl] = useState('');

    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

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

        // Start spinner
        setIsLoadingSubmit(true);

        const formData = new FormData(e.target);
        const ownerLessons = lessons.filter(x => x.owner === inputData.owner);

        for (let i = 0; i < ownerLessons?.length; i++) {
            if (formData.get(ownerLessons[i].id) !== null) {
                formData.append("lessons", formData.get(ownerLessons[i].id))
            }
        }

        if (ownerLessons?.length < 6) {
            setError({ active: true, message: "You need at least 6 lessons to create a course." });
        } else {
            courseService.update(formData, id)
                .then(res => {
                    update(res)

                    // Stop spinner
                    setIsLoadingSubmit(false);
                    navigate('/course/details/' + id + '/' + res.lessons[0].id)

                    toast.success('Successfully edited course!', {
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
                    setIsLoadingSubmit(false);
                })
        }
    }

    return (<div lassName="backgound-layer-create">
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
                                        onBlur={(e) => minMaxValidator(e, 3, 20, setErrors, inputData)}
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
                                        <img className='img-fluid mb-3' src={visualizationImageUrl} alt='img' style={{ height: 300 }} />
                                    </>
                                }

                                <h5>Your lessons</h5>
                                <div className="form-floating mb-3">
                                    {lessons.filter(x => x.owner === inputData.owner).length > 0
                                        ? lessons.filter(x => x.owner === inputData.owner)?.map(x => <Option {...x} key={x.id} onChange={onChange} isSelected={inputData.lessons.some(y => y.id === x.id)} />)
                                        : <p className='text-center'>No lessons yet.</p>
                                    }

                                    {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong> {error.message}
                                    </div> : null
                                    }

                                    {lessons.filter(x => x.owner === inputData.owner).length < 6 ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong>You need at least 6 lessons to create a course.
                                    </div> : null
                                    }
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn btn-outline-warning"
                                        style={{ backgroundColor: "#636EA7" }}
                                        type="submit"
                                        disabled={isLoadingSubmit || !isValidForm(errors) || (!inputData.title || !inputData.description || lessons.filter(x => x.owner === inputData.owner)?.length < 6)}
                                    >
                                        {isLoadingSubmit
                                            ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true" />
                                            : <></>}
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