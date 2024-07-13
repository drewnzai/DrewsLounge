import {useState} from "react";
import ConversationService from "../services/ConversationService.service";
import {Conversation} from "../models/Conversation";
import {Message} from "../models/Message";
import AuthService from "../services/AuthService.service";

export default function SendMessage({conversation}: {conversation: Conversation}){
    const [messageContent, setContent] = useState("");
    const authService = new AuthService();
    const conversationService = new ConversationService();
    
    
    const sendMessage = () => {
        const message: Message = {
            sender: authService.getCurrentUsername(),
            content: messageContent,
            conversationName: conversation.conversationName,
            messageId: 0,
            status: "NOT SEEN"
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