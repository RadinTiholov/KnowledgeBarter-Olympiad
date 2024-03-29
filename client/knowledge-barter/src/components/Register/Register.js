import './Register.css'
import background from '../../images/waves-register.svg'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../dataServices/authService'
import { onSelectFile } from '../../infrastructureUtils/fileSelectionUtils';
import { emailValidator, isValidForm, passwordValidator, usernameValidator } from '../../infrastructureUtils/validationUtils';
import { useTranslation } from 'react-i18next';

export const Register = () => {
    const { t } = useTranslation();

    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: false,
        username: false,
        password: false,
        image: false,
    })
    const [error, setError] = useState({ active: false, message: "" });
    const [inputData, setInputData] = useState({
        email: "",
        username: "",
        password: "",
        rePassword: ""
    });

    const [imageData, setImageData] = useState({
        imageFile: '',
    });

    const [visualizationImageUrl, setVisualizationImageUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // Start spinner
        setIsLoading(true);

        if (inputData.password === inputData.rePassword) {
            const formData = new FormData(e.target);
            
            formData.append('username', inputData.username);
            formData.append('email', inputData.email);
            formData.append('password', inputData.password);

            authService.register(formData)
                .then(res => {
                    userLogin(res);

                    //Stop spinner
                    setIsLoading(false);
                    navigate('/')
                })
                .catch(res => {
                    setError({ active: true, message: res.message })

                    //Stop spinner
                    setIsLoading(false);
                })
        }
        else {
            setError({ active: true, message: "Password and RePassword aren't the same." })

            //Stop spinner
            setIsLoading(false);
        }
    }

    const rePasswordValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: !inputData.rePassword }))
    }

    return (

        <div style={{ backgroundImage: `url(${background})` }} className="backgound-layer-register">
            {/* Login Form */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-bold fs-5">
                                    {t("registerForm")}
                                </h5>
                                <form onSubmit={onSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="username"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            placeholder="ExAmPlE"
                                            value={inputData.username}
                                            onChange={onChange}
                                            onBlur={(e) => usernameValidator(e, setErrors, inputData)}
                                        />
                                        <label htmlFor="username">{t("username")}</label>
                                    </div>
                                    {errors.username && <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                        <div className="text-center">
                                            {t("usernameValMsg")}
                                        </div>
                                    </div>}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={inputData.email}
                                            onChange={onChange}
                                            onBlur={(e) => emailValidator(e, setErrors, inputData, 'email')}
                                        />
                                        <label htmlFor="email">{t("emailAddress")}</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.email && <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                        <div className="text-center">
                                            {t("provideEmail")}
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
                                            onBlur={(e) => passwordValidator(e, setErrors, inputData)}
                                        />
                                        <label htmlFor="password">{t("password")}</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.password &&
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div className="text-center">
                                                {t("enterPassword")}
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
                                        <label htmlFor="floatingRepeatPassword">{t("repeatPassword")}</label>
                                    </div>
                                    {/* Alert */}
                                    {errors.rePassword &&
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div className="text-center">
                                                {t("enterPassword")}
                                            </div>
                                        </div>}
                                    {/*Image input*/}
                                    <div>
                                        <input
                                            className='form-control'
                                            type='file'
                                            name='image'
                                            onChange={e => onSelectFile(e, setImageData, setVisualizationImageUrl, setErrors)}
                                        />
                                        <label htmlFor='formFile' className='form-label'>
                                            {t("chooseProfilePicture")}
                                        </label>
                                    </div>
                                    {/*Poster alert*/}
                                    {errors.image &&
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div className="text-center">
                                                {t("allowedExtensions")}
                                            </div>
                                        </div>}
                                    {visualizationImageUrl &&
                                        <>
                                            <img className='img-fluid mb-3' src={visualizationImageUrl} alt='img' style={{ height: 300 }} />
                                        </>
                                    }
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            type="submit"
                                            disabled={isLoading ||!isValidForm(errors) || !(inputData.email && inputData.password && inputData.rePassword && imageData.imageFile && inputData.username)}
                                        >
                                            {isLoading 
                                                ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true" /> 
                                                : <></>}
                                            {t("register")}
                                        </button>
                                    </div>
                                    {/* Error message */}
                                    {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong> {error.message}
                                    </div> : null}
                                    <hr className="my-4" />
                                    <h5 style={{ textAlign: "center" }}>or</h5>
                                    <div className="d-grid">
                                        <Link
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            to='/login'
                                        >
                                            {t("login")}
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