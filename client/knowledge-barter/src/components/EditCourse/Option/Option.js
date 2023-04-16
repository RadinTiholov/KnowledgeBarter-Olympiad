export const Option = (props) => {
    return (
        <div className="form-check form-check-inline">
            <input
                className="form-check-input"
                type="checkbox"
                id={`inlineCheckbox${props.id}`}
                name={props.id}
                defaultValue={props.id}
                defaultChecked={props.isSelected}
            />
            <label className="form-check-label" htmlFor={`inlineCheckbox${props.id}`}>
                {props.title}
            </label>
        </div>
    )
}