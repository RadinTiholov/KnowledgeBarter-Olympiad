import { Link, useNavigate } from 'react-router-dom';
import background from '../../images/waves-login.svg'
import './Login.css'
import * as authService from '../../services/authService'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState } from 'react';

export const Login = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })
    const [error, setError] = useState({active: false, message: ""});
    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        authService.login(inputData)
            .then(res => {
                userLogin(res);
                navigate('/')
            })
            .catch(res => {
                setError({active: true, message: res.message})
            })
    }
    //Validation
    const emailValidator = (e) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setErrors(state => ({ ...state, [e.target.name]: !re.test(inputData.email) }))
    }
    const passwordValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: !inputData.password }))
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
                                <h5 className="card-title text-center mb-5 fw-bold fs-5">
                                    Login Form
                                </h5>
                                <form onSubmit={onSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            name="email"
                                            value={inputData.email}
                                            onChange={onChange}
                                            onBlur={(e) => emailValidator(e)}
                                        />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.email &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                Please provide a valid email address.
                                            </div>
                                        </div>}

                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Password"
                                            name="password"
                                            onChange={onChange}
                                            value={inputData.password}
                                            onBlur={(e) => passwordValidator(e)}
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.password &&
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div className="text-center">
                                                Please enter a password.
                                            </div>
                                        </div>}

                                    <div className="d-grid">
                                        <button
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            type="submit"
                                            disabled={!isValidForm || (!inputData.name && !inputData.password)}
                                        >
                                            Login
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
                                            to="/register"
                                        >
                                            Register
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