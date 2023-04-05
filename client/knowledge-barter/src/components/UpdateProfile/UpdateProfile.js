import { useContext, useEffect, useState } from "react";
import { emailValidator, isValidForm, usernameValidator } from "../../infrastructureUtils/validationUtils";
import { onSelectFile } from "../../infrastructureUtils/fileSelectionUtils";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../dataServices/authService";
import { useNavigate } from "react-router-dom";

export const UpdateProfile = () => {

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        authService.getDetails(auth._id)
            .then(res => {
                setInputData({email: res.email, username: res.username})
                setVisualizationImageUrl(res.imageUrl)
            })
            .catch(err => console.log(err))
    }, [auth])

    const [errors, setErrors] = useState({
        email: false,
        username: false,
        image: false,
    })

    const [error, setError] = useState({ active: false, message: "" });

    const [inputData, setInputData] = useState({
        email: "",
        username: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const [visualizationImageUrl, setVisualizationImageUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [imageData, setImageData] = useState({
        imageFile: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        // Start spinner
        setIsLoading(true);

        let formData = new FormData(e.target);
        
        authService.update(formData)
            .then(res => {
                // Stop spinner
                setIsLoading(false);
                navigate('/profile/' + auth._id)
            })
            .catch(err => {
                setError({ active: true, message: err.message })
                
                // Stop spinner
                setIsLoading(false);
            })
    }

    return (
        <div className="backgound-layer-register">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-bold fs-5">
                                    Edit Profile
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
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={inputData.email}
                                            onChange={onChange}
                                            onBlur={(e) => emailValidator(e, setErrors, inputData, 'email')}
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
                                    {/*Image input*/}
                                    <div>
                                        <input
                                            className='form-control'
                                            type='file'
                                            name='image'
                                            onChange={e => onSelectFile(e, setImageData, setVisualizationImageUrl, setErrors)}
                                        />
                                        <label htmlFor='formFile' className='form-label'>
                                            Choose Profile Picture
                                        </label>
                                    </div>
                                    {/*Poster alert*/}
                                    {errors.image &&
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div className="text-center">
                                                The allowed extenstions are jpeg, jpg and png.
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
                                            disabled={isLoading || !isValidForm(errors) || !(inputData.email && inputData.username)}
                                        >
                                            {isLoading
                                                ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true" />
                                                : <></>}
                                            Update
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