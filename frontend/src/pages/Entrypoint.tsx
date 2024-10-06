import {Navigate, Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {createContext, useContext, useEffect, useState} from "react";
import {Conversation} from "../models/Conversation";
import ConversationService from "../services/ConversationService.service";


interface ConversationsContextType {
    conversations: Conversation[];
    addConversation: (conversation: Conversation) => void;
    getConversations: () => Conversation[];
}

const CurrentConversationsContext = createContext<ConversationsContextType | undefined>(undefined);

export default function Entrypoint(){
    
    const user: any | null = localStorage.getItem("user");
    const conversationService = new ConversationService();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    


    const addConversation = (conversation: Conversation) => {
        setConversations((prevConversations) => [...prevConversations, conversation]);
    }

    const getConversations = (): Conversation[] => {
        return conversations;
    };

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
       user? 
       
       <CurrentConversationsContext.Provider value={{conversations, addConversation, getConversations}}>

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