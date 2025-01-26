import {Navigate, Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {createContext, useContext, useEffect, useState} from "react";
import {Conversation} from "../models/Conversation";
import ConversationService from "../services/ConversationService.service";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import AuthService from "../services/AuthService.service";


interface ConversationsContextType {
    conversations: Conversation[];
    addConversation: (conversation: Conversation) => void;
}

const CurrentConversationsContext = createContext<ConversationsContextType | undefined>(undefined);

export default function Entrypoint(){
    
    const user: any | null = localStorage.getItem("user");
    const conversationService = new ConversationService();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const authService = new AuthService();
    


    const addConversation = (conversation: Conversation) => {
        setConversations((prevConversations) => [...prevConversations, conversation]);
    }

    useEffect(
        () => {
            conversationService.getAllConversations()
            .then(
                (response: Conversation[]) => {
                    console.log(response.toString());
                    setConversations(response);
                }
            );

            const socket = new SockJS('http://localhost:8080/ws');
            const client = Stomp.over(() => socket);
            
            client.connect({}, () => {

                client.subscribe(`/topic/new-conversation/${authService.getCurrentUsername()}`, (message) => {
                    const newConversation: Conversation = JSON.parse(message.body);
                    setConversations((prevConversations) => [...prevConversations, newConversation]);
                });
            }) 

            

                return() => {
                    client.disconnect();
                }

           


        }, []
    );

    return(
       user? 
       
       <CurrentConversationsContext.Provider value={{conversations, addConversation}}>

       <div className="app">
                
                <Sidebar/>

            <main className="content">
            <Outlet/>
            </main>

        </div>

       </CurrentConversationsContext.Provider>
       : <Navigate to={"/login"}/>
    );
}

export const useConversations = () => {
    const context = useContext(CurrentConversationsContext);
    if (!context) {
        throw new Error('useConversations must be used within a ConversationsProvider');
    }
    return context;
};