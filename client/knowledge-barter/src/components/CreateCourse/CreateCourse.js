import './CreateCourse.css'
import background from '../../images/waves-login.svg'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useCollectionInfo} from '../../hooks/useCollectionInfo'
import { Option } from './Option/Option';
import {CourseContext} from '../../contexts/CourseContext'
import {AuthContext} from '../../contexts/AuthContext'
import * as courseService from '../../services/coursesService'

export const CreateCourse = () => {
    const [collection] = useCollectionInfo('ownLessons');
    const navigate = useNavigate();
    const {create} = useContext(CourseContext)
    const {updatePoints} = useContext(AuthContext);
    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        tumbnail: ""
    });
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        tumbnail: false,
        lessons: false
    })
    const [error, setError] = useState({active: false, message: ""});
    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const lessonsIds = [];
        for(let i = 0; i < collection?.length; i++){
            if(formData.get(collection[i]._id) !== null){
                lessonsIds.push(formData.get(collection[i]._id))
            }
        }
        courseService.create({...inputData, lessons: lessonsIds})
            .then(res => {
                create(res);
                updatePoints(500);
                navigate('/course/details/' + res._id+ '/' + res.lessons[0])
            })
            .catch(err => {
                setError({active: true, message: err.message})
            })
    }
    const minMaxValidator = (e, min, max) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData[e.target.name].length < min || inputData[e.target.name].length > max}))
    }
    const urlValidator = (e) => {
        var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        setErrors(state => ({ ...state, [e.target.name]: !re.test(inputData[e.target.name]) }))
    }
    const isValidForm = !Object.values(errors).some(x => x);
    return (<div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-login">
        {/* Login Form */}
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-bold fs-5">
                                Create Course
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
                                        value = {inputData.title}
                                        onBlur = {(e) => minMaxValidator(e, 3, 20)}
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
                                        value = {inputData.description}
                                        onBlur = {(e) => minMaxValidator(e, 10, 60)}
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
                                        name="tumbnail"
                                        id="tumbnail"
                                        placeholder="Some link"
                                        onChange={onChange}
                                        value = {inputData.tumbnail}
                                        onBlur = {(e) => urlValidator(e)}
                                    />
                                    <label htmlFor="tumbnail">Thumbnail Link</label>
                                </div>
                                {/* Alert */}
                                {errors.tumbnail && 
                                    <div
                                        className="alert alert-danger d-flex align-items-center"
                                        role="alert"
                                    >
                                        <i className="fa-solid fa-triangle-exclamation me-2" />
                                        <div className="text-center">
                                            Please provide valid URL.
                                        </div>
                                    </div>}
                                <h5>Your lessons</h5>
                                <div className="form-floating mb-3">
                                { collection.length > 0 ? collection?.map(x => <Option {...x} key = {x._id} onChange= {onChange} value = {inputData.lessons}/>)  : <p className='text-center'>No lessons yet.</p>}
                                {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error! </strong> {error.message}
                                    </div>: null}
                                {collection?.length < 6 ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error! </strong>You need at least 6 lessons to create a course.
                                    </div>: null}
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn btn-outline-warning"
                                        style={{ backgroundColor: "#636EA7" }}
                                        type="submit"
                                        disabled={!isValidForm || (!inputData.title || !inputData.description || !inputData.tumbnail || collection?.length < 6)}
                                    >
                                        Create
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