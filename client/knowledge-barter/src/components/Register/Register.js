import './Register.css'
import background from '../../images/waves-register.svg'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'

export const Register = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })
    const [error, setError] = useState({ active: false, message: "" });
    const [inputData, setInputData] = useState({
        email: "",
        username: "",
        password: "",
        rePassword: "",
        profilePicture: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (inputData.password === inputData.rePassword) {
            authService.register(inputData)
                .then(res => {
                    userLogin(res);
                    navigate('/')
                })
                .catch(res => {
                    setError({active: true, message: res.message})
                })
        }
        else{
            setError({active: true, message: "Password and RePassword aren't the same."})
        }
    }
    const emailValidator = (e) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setErrors(state => ({ ...state, [e.target.name]: !re.test(inputData.email) }))
    }
    const passwordValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: !inputData.password }))
    }
    const rePasswordValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: !inputData.rePassword }))
    }
    const usernameValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData.username.length < 2 || inputData.username.length > 30 }))
    }
    const profilePictureValidator = (e) => {
        var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        setErrors(state => ({ ...state, [e.target.name]: !re.test(inputData.profilePicture) }))
    }
    const isValidForm = !Object.values(errors).some(x => x);
    return (
        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-register">
            {/* Login Form */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-bold fs-5">
                                    Register Form
                                </h5>
                                <form onSubmit={onSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={inputData.email}
                                            onChange={onChange}
                                            onBlur={(e) => emailValidator(e)}
                                        />
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.email && <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                        <div className="text-center">
                                            Please provide a valid email address.
                                        </div>
                                    </div>}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="username"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            placeholder="ExAmPlE"
                                            value={inputData.username}
                                            onChange={onChange}
                                            onBlur={(e) => usernameValidator(e)}
                                        />
                                        <label htmlFor="username">Username</label>
                                    </div>
                                    {errors.username && <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                        <div className="text-center">
                                            Your username must be more than 2 and less than 30 characters.
                                        </div>
                                    </div>}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={inputData.password}
                                            onChange={onChange}
                                            onBlur={(e) => passwordValidator(e)}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.password &&
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div className="text-center">
                                                Please enter a password.
                                            </div>
                                        </div>}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingRepeatPassword"
                                            name="rePassword"
                                            placeholder="Repeat Password"
                                            value={inputData.rePassword}
                                            onChange={onChange}
                                            onBlur={(e) => rePasswordValidator(e)}
                                        />
                                        <label htmlFor="floatingRepeatPassword">Repeat Password</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.rePassword &&
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div className="text-center">
                                                Please enter a password.
                                            </div>
                                        </div>}
                                    {/* profilePicture */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="profilePicture"
                                            name="profilePicture"
                                            placeholder="Profile Picture Link"
                                            value={inputData.profilePicture}
                                            onChange={onChange}
                                            onBlur={(e) => profilePictureValidator(e)}
                                        />
                                        <label htmlFor="profilePicture">Profile Picture Link</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.profilePicture &&
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div className="text-center">
                                                Please provide valid URL.
                                            </div>
                                        </div>}
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            type="submit"
                                            disabled={!isValidForm || !(inputData.email  && inputData.password && inputData.rePassword && inputData.profilePicture && inputData.username)}
                                        >
                                            Register
                                        </button>
                                    </div>
                                    {/* Error message */}
                                    {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong> {error.message}
                                    </div>: null}
                                    <hr className="my-4" />
                                    <h5 style={{ textAlign: "center" }}>or</h5>
                                    <div className="d-grid">
                                        <Link
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            to='/login'
                                        >
                                            Login
                                        </Link>
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