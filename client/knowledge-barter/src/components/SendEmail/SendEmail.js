import { useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useLessonsWithUser } from "../../hooks/useLessonsWithUser";
import background from '../../images/waves-login.svg';
import * as emailService from '../../dataServices/emailService';

export const SendEmail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { lesson, setLesson, owner } = useLessonsWithUser(id);

    const [inputData, setInputData] = useState({
        senderEmail: '',
        topic: '',
        emailText: ''
    });

    const [error, setError] = useState({ active: false, message: "" });
    const [errors, setErrors] = useState({
        senderEmail: false,
        topic: false,
        emailText: false
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        emailService.sendEmail({...inputData, ownerEmail: owner.email})
            .then(res => {
                navigate('/lesson/details/' + id)
            })
            .catch(res => {
                setError({active: true, message: res.message})
            })
    }

    const emailValidator = (e) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setErrors(state => ({ ...state, [e.target.name]: !re.test(inputData.senderEmail) }))
    }
    const minMaxValidator = (e, min, max) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData[e.target.name].length < min || inputData[e.target.name].length > max }))
    }
    const isValidForm = !Object.values(errors).some(x => x);

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-login">
            {/* Login Form */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center fw-bold fs-5">
                                    Contact Owner Form
                                </h5>
                                <h3 className="text-center mb-4 fs-5">
                                    Lesson : {lesson.title}
                                </h3>
                                <form onSubmit={onSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="senderEmail"
                                            placeholder="name@example.com"
                                            name="senderEmail"
                                            value={inputData.senderEmail}
                                            onChange={onChange}
                                            onBlur={(e) => emailValidator(e)}
                                        />
                                        <label htmlFor="senderEmail">Your email</label>
                                    </div>

                                    {/* Alert */}
                                    {errors.senderEmail &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                Please provide a valid email!
                                            </div>
                                        </div>
                                    }

                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="topic"
                                            placeholder="Example topic"
                                            name="topic"
                                            value={inputData.topic}
                                            onChange={onChange}
                                            onBlur={(e) => minMaxValidator(e, 3, 20)}
                                        />
                                        <label htmlFor="topic">Topic</label>
                                    </div>

                                    {/* Alert */}
                                    {errors.topic &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                The length of the topic must be a minimum of 3 and a maximum of 20 characters.
                                            </div>
                                        </div>
                                    }

                                    <div className="form-control mb-3">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="emailText"
                                            id="emailText"
                                            rows={20}
                                            value={inputData.emailText}
                                            onChange={onChange}
                                            onBlur = {(e) => minMaxValidator(e, 30, 1000)}
                                        />
                                        <label htmlFor="emailText">Email</label>
                                    </div>

                                    {/* Alert */}
                                    {errors.emailText &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                The length of the email must be a minimum of 20 and a maximum of 1000 characters.
                                            </div>
                                        </div>}

                                    <div className="d-grid">
                                        <button
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            type="submit"
                                            disabled={!isValidForm || (!inputData.senderEmail && !inputData.topic && !inputData.emailText)}
                                        >
                                            Send Email
                                        </button>
                                    </div>

                                    {/* Error message */}
                                    {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong> {error.message}
                                    </div> : null}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}