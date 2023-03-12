export const MesssageBubble = (props) => {
    return (
        <div className={`msg ${props.position}-msg`}>
            <img
                className="msg-img"
                src={`${props.senderImage}`} alt="" />
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{props.senderUsername}</div>
                </div>
                <div className="msg-text">{props.text}</div>
            </div>
        </div>
    )
}