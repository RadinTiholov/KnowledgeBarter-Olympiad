export const Option = (props) => {
    return (
        <div className="form-check form-check-inline">
            <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                name={props.id}
                defaultValue={props.id}
                defaultChecked={props.isSelected}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
                {props.title}
            </label>
        </div>
    )
}