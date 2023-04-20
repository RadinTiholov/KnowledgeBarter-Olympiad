import { useTranslation } from "react-i18next"

export const SmallSpinner = () => {
    const { t } = useTranslation();

    return (
        <div className="spinner-border m-3" role="status">
            <span className="sr-only">{t("loading")}</span>
        </div>
    )
}