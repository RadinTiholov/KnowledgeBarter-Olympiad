export const isValidForm = (errors) => !Object.values(errors).some(x => x);

export const commentValidator = (min, max, comment, setError, setErrorMessage) => {
    if (comment.length < min || comment.length > max ) {
        setError(true);
        setErrorMessage("The length of the comment must be a minimum of 10 and a maximum of 200 characters.");
    }else{
        setError(false);
    }
}