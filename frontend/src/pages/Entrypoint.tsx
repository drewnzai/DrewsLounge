import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Conversation } from "../models/Conversation";
import ConversationService from "../services/ConversationService.service";

export default function Entrypoint(){
    
    const user: any | null = localStorage.getItem("user");
    const conversationService = new ConversationService();
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(
        () => {
            conversationService.getAllConversations()
            .then(
                (response: Conversation[]) => {
                    setConversations(response);
                }
            )
        }, []
    );

    return(
       user? <div className="app">
                
                <Sidebar conversations={conversations}/>

            <main className="content">
            <Outlet/>
            </main>

        </div>

        : <Navigate to={"/login"}/>
    );
}