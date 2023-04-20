import i18n from 'i18next';
import { useTranslation } from 'react-i18next' 

export const LanguageSelector = () => {

    const onChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    const { t } = useTranslation();

    return (
        <>
            <select class="form-select" name="language" onChange={onChange}>
                <option value="en">English</option>
                <option value="bg">Български</option>
            </select>
            <p>{t("welcome")}</p>
        </>
    )
}