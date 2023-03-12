export const MesssageBubble = (props) => {
    return (
        <div className={`msg ${props.position}-msg`}>
            <div
                className="msg-img"
                style={{ backgroundImage: 'http://res.cloudinary.com/dubpxleer/image/upload/v1676224024/285244545_722302912316845_1878014851432114413_n.jpg.jpg' }}
            ></div>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{props.senderUsername}</div>
                </div>
                <div className="msg-text">{props.text}</div>
            </div>
        </div>
    )
}