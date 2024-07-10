import React, { useEffect, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Conversation } from '../models/Conversation';


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState<CompatClient| null>(null);
    const location = useLocation();
    const conversation: Conversation = location.state;

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
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
