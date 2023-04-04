export const isValidForm = (errors) => !Object.values(errors).some(x => x);

export const commentValidator = (min, max, comment, setError, setErrorMessage) => {
    if (comment.length < min || comment.length > max) {
        setError(true);
        setErrorMessage("The length of the comment must be a minimum of 10 and a maximum of 200 characters.");
    } else {
        setError(false);
    }
}

export const minMaxValidator = (e, min, max, setErrors, inputData) => {
    setErrors(state => ({ ...state, [e.target.name]: inputData[e.target.name].length < min || inputData[e.target.name].length > max }))
}

export const urlYoutubeValidator = (e, setErrors, inputData) => {
    //var re = /^(https|http):\/\/(?:www\.)?youtube.com\/embed\/[A-z0-9]+/;
    const re = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

    const match = inputData[e.target.name].match(re);

    setErrors(state => ({ ...state, [e.target.name]: !(match && match[2].length === 11) }));
}

export const isPositiveLength = (e, setErrors, inputData) => {
    setErrors(state => ({ ...state, [e.target.name]: inputData[e.target.name].length < 0 }))
}

export const emailValidator = (e, setErrors, inputData, propName) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setErrors(state => ({ ...state, [e.target.name]: !re.test(inputData[propName]) }))
}

export const usernameValidator = (e, setErrors, inputData) => {
    setErrors(state => ({ ...state, [e.target.name]: inputData.username.length < 2 || inputData.username.length > 20 }))
}

export const passwordValidator = (e, setErrors, inputData) => {
    setErrors(state => ({ ...state, [e.target.name]: !inputData.password }))
}