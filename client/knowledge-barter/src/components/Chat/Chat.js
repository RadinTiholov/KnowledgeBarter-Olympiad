import "./Chat.css"
import { HubConnectionBuilder } from '@microsoft/signalr';
import { MesssageBubble } from "./MessageBubble/MessageBubble";
import { BookSpinner } from "../common/Spinners/BookSpinner";
import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as messagesService from "../../dataServices/messagesService";

export const Chat = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { auth } = useContext(AuthContext);

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);

    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        messagesService
            .getAll(searchParams.get('receiver'))
            .then(res => {
                setMessages(res);
                setIsLoading(false);
            })
            .catch(err => {
                alert(err);
            });

        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:3030/chatHub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    //Subscribe to the group

                    connection.invoke("Subscribe", auth.username).catch(function (err) {
                        return console.error(err.toString());
                    });

                    connection.on("ReceiveMessage", function (message) {
                        const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

                        //const imageUrlRaw = get("#receiver-img").style.backgroundImage;
                        //const imageUrl = imageUrlRaw.substring(5, imageUrlRaw.length - 2);\

                        //name, img, side, text
                        //appendMessage(user, imageUrl, "left", msg);
                        const messageTemp = {
                            id: Math.floor(Math.random() * 3000),
                            text: msg,
                            senderUsername: searchParams.get('receiver'),
                            senderImage: "http://res.cloudinary.com/dubpxleer/image/upload/v1676215991/Admin-Profile-Vector-PNG-Clipart.png.png",
                            receiverUsername: auth.username,
                            receiverImage: "http://res.cloudinary.com/dubpxleer/image/upload/v1676224024/285244545_722302912316845_1878014851432114413_n.jpg.jpg"
                        }
                        createMessage(messageTemp);
                    });

                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection, searchParams]);

    const onSubmit = async (e) => {
        e.preventDefault();

        // Make API Call to create message
        messagesService
            .create({ 
                text: messageText,
                receiverUsername: searchParams.get('receiver')
            })
            .then(async (res) => {
                try {
                    await connection.invoke(
                        "SendMessageToGroup",
                        searchParams.get('receiver'),
                        messageText);
                }
                catch (e) {
                    console.log(e);
                }

                createMessage(res);
            })
            .catch(err => {
                alert(err);
            });
    }

    const createMessage = (message) => {
        setMessages(state => [...state, message]);
    }

    return (
        <div className="container d-flex justify-content-center">
            <section className="msger">
                <header className="msger-header">
                    <div className="msger-header-title">
                        <i className="fas fa-comment-alt" /> Chat with {searchParams.get('receiver')}
                    </div>
                </header>
                <div className="msger-chat">
                    {isLoading ? 
                    <BookSpinner/> :
                    messages.map(x => <MesssageBubble key={x.id} position={x.senderUsername === searchParams.get('receiver') ? 'left' : 'right'} {...x} />)}
                </div>
                <form className="msger-inputarea" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="messageText"
                        className="msger-input"
                        placeholder="Enter your message..."
                        value={messageText}
                        onChange={(e) => { setMessageText(e.target.value) }}
                    />
                    <input type="hidden" id="receiver" defaultValue="@Model.Receiver" />
                    <button type="submit" className="msger-send-btn">
                        Send
                    </button>
                </form>
            </section>
        </div>
    )
}