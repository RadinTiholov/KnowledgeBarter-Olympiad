export const onSelectFile = (e, setImageData, setVisualizationImageUrl, setErrors) => {
    setImageData((state) => ({ ...state, imageFile: e.target.files[0] }));

    //Creating local image url for visualization
    if (e.target.files[0]) {
        let extension = e.target.files[0].name.split('.')[1];
        let allowedExtensions = ['jpg', 'jpeg', 'png']
        if (!allowedExtensions.some(x => x === extension)) {
            setErrors(state => ({ ...state, image: true }))
            
            setVisualizationImageUrl('');
        }
        else{
            setErrors(state => ({ ...state, image: false }))

            setVisualizationImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    } else {
        setErrors(state => ({ ...state, image: true }))

        setVisualizationImageUrl('');
    }
}