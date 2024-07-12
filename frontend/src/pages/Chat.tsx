import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CompatClient, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useLocation} from 'react-router-dom';
import {Conversation} from '../models/Conversation';
import {Message} from '../models/Message';
import AuthService from '../services/AuthService.service';
import ConversationService from '../services/ConversationService.service';
import SendMessage from '../components/SendMessage';


const Chat = () => {
    const [messageContent, setContent] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [stompClient, setStompClient] = useState<CompatClient| null>(null);
    const location = useLocation();
    const conversation: Conversation = location.state;
    const conversationService = new ConversationService();
    const authService = new AuthService();

    

    const stompClientRef = useRef<CompatClient | null>(null);
    
    // TO-DO change the backend to render full conversation name and modify it from here
    // Do the message functionality

    const fetchPreviousMessages = useCallback(async () => {
        conversationService.getMessages(conversation)
            .then(
                (response) => {
                    setMessages(response);
                }
            )

    }, [conversation]);
    
    const connectWebSocket = useCallback(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(() => socket);

        client.connect({}, () => {
            client.subscribe(`/topic/conversation/${conversation.conversationName}`, (message) => {
                const receivedMessage: Message = JSON.parse(message.body);
                console.log(receivedMessage);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        });

        stompClientRef.current = client;

        return client;
    }, [conversation]);

    useEffect(() => {

        fetchPreviousMessages();
        const client = connectWebSocket();
        
        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [connectWebSocket, fetchPreviousMessages]);

    return (
        <div>
        <div>
            {messages? messages.map((msg, index) => (
                <div key={index}>
                    <strong>{msg.sender}:</strong> {msg.content}
                </div>
            )): 
            <div>
                <h2>No messages at the moment</h2>
            </div>
            }
        </div>
        <SendMessage conversation={conversation}/>
        </div>
    );
};

export default Chat;
