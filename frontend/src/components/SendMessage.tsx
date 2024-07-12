import { useState } from "react";
import ConversationService from "../services/ConversationService.service";
import { Conversation } from "../models/Conversation";
import { Message } from "../models/Message";

export default function SendMessage({conversation}: {conversation: Conversation}){
    const [messageContent, setContent] = useState("");

    const userStr = JSON.parse(localStorage.getItem("user")!);

    const conversationService = new ConversationService();
    
    
    const sendMessage = () => {
        const message: Message = {
            sender: userStr.username,
            content: messageContent,
            conversationName: conversation.conversationName

        }
        
        conversationService.sendMessage(message)
            .then(
                (_response) => {
                    setContent('');
                }
            )
    }

    return(
        <div>
            <input type="text" value={messageContent} onChange={(e) => setContent(e.target.value)}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}