import {useState} from "react";
import {ConversationRequest} from "../models/ConversationRequest";
import ConversationService from "../services/ConversationService.service";
import {useConversations} from "./Entrypoint";
import {Conversation} from "../models/Conversation";
import AuthService from "../services/AuthService.service";

export default function Home(){
    const { addConversation } = useConversations();
    const authService = new AuthService();
    const [secondUsername, setUsername] = useState("");
    const username = authService.getCurrentUsername();
    const [conversationRequest, setConversationRequest] = useState<ConversationRequest>({
        username1: username,
        username2: null,
        groupName: null
    });

    const conversationService = new ConversationService();

const handlePrivateConversation = () => {
    setConversationRequest(
        (prev) => ({
            ...prev,
            username2: secondUsername
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
    

    setUsername('');

}
    return(
        <div>
            <input type="text" value={secondUsername} 
            onChange={(e) => {
                setUsername(e.target.value)
            }} 
            placeholder="New Conversation Name" />
            <input type="submit" onClick={handlePrivateConversation}/>
        </div>
    );
}