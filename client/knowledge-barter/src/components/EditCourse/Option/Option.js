export const Option = (props) => {
    return (
        <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="inlineCheckbox1"
                                            name = {props._id}
                                            defaultValue={props._id}
                                            defaultChecked = {props.isSelected}
                                        />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">
                                            {props.title}
                                        </label>
                                    </div>
    )
}