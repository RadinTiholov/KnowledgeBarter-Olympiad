export const onSelectFile = (e, setImageData, setVisualizationImageUrl, setErrors) => {
    setImageData((state) => ({ ...state, imageFile: e.target.files[0] }));

        //Creating local image url for visualization
        if (e.target.files[0]) {
            setVisualizationImageUrl(URL.createObjectURL(e.target.files[0]));
            //Turn off validation error
            setErrors(state => ({ ...state, posterUrl: false }))
        } else {
            setVisualizationImageUrl('');
            //Turn on validation error
            setErrors(state => ({ ...state, posterUrl: true }))
        }
}