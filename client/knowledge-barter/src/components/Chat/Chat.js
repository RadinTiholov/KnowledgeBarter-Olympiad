import "./Chat.css"
import messageSound from '../../sound/bellSound.mp3';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { MesssageBubble } from "./MessageBubble/MessageBubble";
import { BookSpinner } from "../common/Spinners/BookSpinner";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as messagesService from "../../dataServices/messagesService";
import * as authService from "../../dataServices/authService";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const Chat = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { auth } = useContext(AuthContext);

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [yourImage, setYourImage] = useState("");

    const [messageText, setMessageText] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const messageAudio = new Audio(messageSound);

    useEffect(() => {
        authService.getAllProfiles()
            .then(res => {
                const profile = res.filter(x => x.userName === auth.username);

                setYourImage(profile[0].imageUrl);
            })
    }, [])

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
            .withUrl("https://knowledgebarterserver.azurewebsites.net/chatHub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {

        if (connection) {
            connection.start()
                .then(result => {

                    connection.invoke("Subscribe", auth.username).catch(function (err) {
                        return console.error(err.toString());
                    });

                    connection.on("ReceiveMessage", function (message, imageUrl) {
                        const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

                        var currentdate = new Date();
                        var datetime = currentdate.getDate() + "/"
                            + (currentdate.getMonth() + 1) + "/"
                            + currentdate.getFullYear() + " "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes();

                        const messageTemp = {
                            id: Math.floor(Math.random() * 100000),
                            text: msg,
                            senderUsername: searchParams.get('receiver'),
                            senderImage: imageUrl,
                            receiverUsername: auth.username,
                            receiverImage: "",
                            date: datetime
                        }

                        createMessage(messageTemp);
                        messageAudio.play();
                    });

                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

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
                        messageText,
                        yourImage);
                }
                catch (e) {
                    console.log(e);
                }

                setMessageText('');
                createMessage(res);
            })
            .catch(err => {
                alert(err);
            });
    }

    const createMessage = (message) => {
        setMessages(state => [...state, message]);
    }

    const minMaxValidator = (e, min, max) => {
        if (messageText.length < min || messageText.length > max) {
            setError(true);
        } else {
            setError(false);
        }
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
                        <BookSpinner /> :
                        messages.length > 0 ? messages.map(x => <MesssageBubble key={x.id} position={x.senderUsername === searchParams.get('receiver') ? 'left' : 'right'} {...x} />)
                            : <h2>No messages yet.</h2>}
                </div>
                <form className="msger-inputarea" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="messageText"
                        className="msger-input"
                        placeholder="Enter your message..."
                        value={messageText}
                        onChange={(e) => { setMessageText(e.target.value) }}
                        onBlur={(e) => minMaxValidator(e, 1, 200)}
                    />
                    <input type="hidden" id="receiver" defaultValue="@Model.Receiver" />
                    {error &&
                        <div className="alert alert-danger m-2" role="alert">
                            The message must be between 1 and 200 characters.
                        </div>
                    }
                    <button type="submit" className="msger-send-btn" disabled={error}>
                        Send
                    </button>
                </form>
            </section>
        </div>
    )
}