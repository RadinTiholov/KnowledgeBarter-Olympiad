import "./Chat.css"
import * as signalR from "@microsoft/signalr";
import { MesssageBubble } from "./MessageBubble/MessageBubble";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import * as messagesService from "../../dataServices/messagesService";

export const Chat = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        messagesService
            .getAll(searchParams.get('receiver'))
            .then(res => {
                setMessages(res);
            })
            .catch(err => {
                alert(err);
            })
    }, []);

    let connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    connection.on("ReceiveMessage", function (user, message) {
        const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
        //const imageUrlRaw = get("#receiver-img").style.backgroundImage;
        //const imageUrl = imageUrlRaw.substring(5, imageUrlRaw.length - 2);
    
        //appendMessage(user, imageUrl, "left", msg);
    });
    
    connection.start()
        .then(function () {
            //Subscribe to the group
            //const receiver = get("#receiver").value;
    
            // connection.invoke("Subscribe", receiver).catch(function (err) {
            //     return console.error(err.toString());
            // });
    
            //msgetSendButton.disabled = false;
        }).catch(function (err) {
            return console.error(err.toString());
        });

    return (
        <>
            <div className="container d-flex justify-content-center">
                <section className="msger">
                    <header className="msger-header">
                        <div className="msger-header-title">
                            <i className="fas fa-comment-alt" /> Chat with @Model.Receiver
                        </div>
                        <div className="msger-header-options">
                            <div className="row">
                                <div className="col">
                                    <div
                                        id="your-img"
                                        className="msg-img"
                                        style={{ backgroundImage: "url(@Model.YourImage)" }}
                                    />
                                </div>
                                <div className="col">
                                    <div
                                        id="receiver-img"
                                        className="msg-img"
                                        style={{ backgroundImage: "url(@Model.ReceiverImage)" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="msger-chat">
                        {/* {messages.map(x => <MesssageBubble key = {x.Id} {...x} position = {x.receiverUsername == }/>)} */}
                        {messages.map(x => <MesssageBubble key = {x.Id} {...x}/>)}
                        {/* @foreach (var message in Model.Messages) */}
                        {/* {message.ReceiverUsername == Model.Receiver} */}
                        {/* <MesssageBubble/> */}
                    </div>
                    <form className="msger-inputarea">
                        <input
                            type="text"
                            className="msger-input"
                            placeholder="Enter your message..."
                        />
                        <input type="hidden" id="receiver" defaultValue="@Model.Receiver" />
                        <button type="submit" className="msger-send-btn">
                            Send
                        </button>
                    </form>
                </section>
            </div>
        </>
    )
}