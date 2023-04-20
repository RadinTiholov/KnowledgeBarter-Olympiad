import i18n from 'i18next';

export const LanguageSelector = () => {

    const onChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <>
            <select className="form-select" name="language" onChange={onChange}>
                <option value="en">English</option>
                <option value="bg">Български</option>
            </select>
        </>
    )
}