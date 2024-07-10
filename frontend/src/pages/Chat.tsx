import React, { useEffect, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';
import AuthService from '../services/AuthService.service';
import ConversationService from '../services/ConversationService.service';


const Chat = () => {
    const [message, setMessage] = useState<Message | null>(null);
    const [stompClient, setStompClient] = useState<CompatClient| null>(null);
    const location = useLocation();
    const conversation: Conversation = location.state;
    const username = "";
    const authService = new AuthService();
    const conversationService = new ConversationService();

    // TO-DO change the backend to render full conversation name and modify it from here
    // Do the message functionality
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe(`/topic/conversation/${conversation.conversationName}`, (msg) => {
            });
        });

        setStompClient(client);

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [conversation, stompClient]);

    const sendMessage = () => {

    }

    return (
        <div>
            <input type="text"/>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
