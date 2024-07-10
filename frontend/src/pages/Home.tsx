import { useState } from "react";
import { ConversationRequest } from "../models/ConversationRequest";
import ConversationService from "../services/ConversationService.service";

export default function Home(){
    const [userName, setUserName] = useState("");
    const [conversationRequest, setConversationRequest] = useState<ConversationRequest>({
        username1: null,
        username2: null,
        groupName: null
    });

    const conversationService = new ConversationService();

const handlePrivateConversation = () => {
    setConversationRequest(
        (prev) => ({
            ...prev,
            username1: userName
        })
    )

    conversationService.createPrivateConversation(conversationRequest);

}
    return(
        <div>
            <input type="text" value={userName} 
            onChange={(e) => {
                setUserName(e.target.value)
            }} 
            placeholder="New Conversation Name" />
            <input type="submit" onClick={handlePrivateConversation}/>
        </div>
    );
}