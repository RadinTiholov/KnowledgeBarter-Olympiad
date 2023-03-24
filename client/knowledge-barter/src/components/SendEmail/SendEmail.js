import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLessonsWithUser } from '../../hooks/useLessonsWithUser';
import * as emailService from '../../dataServices/emailService';
import * as authService from '../../dataServices/authService';
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import { emailValidator, isValidForm, minMaxValidator } from '../../infrastructureUtils/validationUtils';

export const SendEmail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { lesson, owner } = useLessonsWithUser(id);
    const { auth } = useContext(AuthContext);
    const { profiles } = useContext(ProfileContext);

    const [inputData, setInputData] = useState({
        senderEmail: '',
        topic: '',
        emailText: '',
        ownerEmail: '',
    });

    const [error, setError] = useState({ active: false, message: "" });
    const [errors, setErrors] = useState({
        senderEmail: false,
        topic: false,
        emailText: false
    });

    useEffect(() => {
        if (auth?._id && profiles.length > 0 && owner?.userName) {

            authService.getDetails(auth._id)
                .then(res => {
                    setInputData(state => (
                        { ...state, senderEmail: res.email }))
                })
                .catch(err => alert(err))

            const ownerInfo = profiles?.find(x => x.userName === owner.userName);

            authService.getDetails(ownerInfo.id)
                .then(res => {
                    setInputData(state => (
                        { ...state, ownerEmail: res.email }))
                })
                .catch(err => alert(err))
        }
    }, [auth._id, profiles, owner])

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        emailService.sendEmail({ ...inputData })
            .then(res => {
                navigate('/lesson/details/' + id)
            })
            .catch(res => {
                setError({ active: true, message: res.message })
            })
    }

    return (
        <div className="backgound-layer-create">
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
                                            onBlur={(e) => emailValidator(e, setErrors, inputData, 'senderEmail')}
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
                                            onBlur={(e) => minMaxValidator(e, 3, 20, setErrors, inputData)}
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
                                            onBlur={(e) => minMaxValidator(e, 30, 1000, setErrors, inputData)}
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
                                            disabled={!isValidForm(errors) || (!inputData.senderEmail && !inputData.topic && !inputData.emailText)}
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