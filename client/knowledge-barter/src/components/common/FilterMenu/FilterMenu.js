import { useTranslation } from "react-i18next"

export const FilterMenu = (props) => {
    const { t } = useTranslation();

    return (
        <>
            <p><i className={`fa-solid fa-${props.iconName} fa-sm`} />{t("filterBy")} {props.param}: </p>
            <div className="row">
                <div className="col-4">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio"
                            value={3}
                            checked={props.option === 3}
                            onChange={props.changeOption}
                            name={`flexRadio${props.param}`} 
                            id={`flexRadio1000${props.param}`} 
                        />
                        <label className="form-check-label" htmlFor={`flexRadio1000${props.param}`}>
                            <p>{t("1000")}</p>
                        </label>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio"
                            value={2}
                            checked={props.option === 2}
                            onChange={props.changeOption}
                            name={`flexRadio${props.param}`} 
                            id={`flexRadio100${props.param}`} 
                        />
                        <label className="form-check-label" htmlFor={`flexRadio100${props.param}`}>
                            <p>100 - 999</p>
                        </label>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio"
                            value={1}
                            checked={props.option === 1}
                            onChange={props.changeOption}
                            name={`flexRadio${props.param}`} 
                            id={`flexRadio1${props.param}`} 
                        />
                        <label className="form-check-label" htmlFor={`flexRadio1${props.param}`}>
                            <p>1 - 99</p>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}