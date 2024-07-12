import { useState } from "react";
import ConversationService from "../services/ConversationService.service";
import { Conversation } from "../models/Conversation";
import { Message } from "../models/Message";

export default function SendMessage({conversation}: {conversation: Conversation}){
    const [messageContent, setContent] = useState("");

    const userStr = JSON.parse(localStorage.getItem("user")!);

    const conversationService = new ConversationService();
    
    const [message, setMessage] = useState<Message>({
        sender: userStr.username,
        content: "",
        conversationName: conversation.conversationName
    });

    const sendMessage = () => {
        setMessage(
        (prev) => ({
            ...prev,
                content: messageContent
        })
        )

        conversationService.sendMessage(message)
            .then(
                (response) => {

                    setContent('');
                }
            )
    }

    return(
        <div>
            <input type="text" value={messageContent} onChange={
                (e) => {
                    setContent(e.target.value);
                }
            }/>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}