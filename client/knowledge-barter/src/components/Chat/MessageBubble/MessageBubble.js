export const MesssageBubble = (props) => {
    return (
        <div className="msg right-msg">
            <div
                className="msg-img"
                style={{ backgroundImage: "url(@message.SenderImage)" }}
            ></div>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">@message.SenderUsername</div>
                </div>
                <div className="msg-text">{props.text}</div>
            </div>
        </div>
    )
}