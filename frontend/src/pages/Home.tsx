import { useState } from "react";
import { ConversationRequest } from "../models/ConversationRequest";
import ConversationService from "../services/ConversationService.service";
import { useConversations } from "./Entrypoint";
import { Conversation } from "../models/Conversation";

export default function Home(){
    const { addConversation } = useConversations();
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

    conversationService.createPrivateConversation(conversationRequest)
        .then(
            (response) => {
                if(response){

                    const newConversation: Conversation = {
                        conversationName: conversationRequest!.username1!
                    }

                    addConversation(newConversation)
                }
            }
        )
    

    setUserName('');

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