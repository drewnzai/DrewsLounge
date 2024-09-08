import { useCallback, useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useLocation } from 'react-router-dom';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';
import AuthService from '../services/AuthService.service';
import ConversationService from '../services/ConversationService.service';
import SendMessage from '../components/SendMessage';
import './Chat.css';  // Import the CSS file for custom styling

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const location = useLocation();
    const conversation: Conversation = location.state;
    const conversationService = new ConversationService();
    const authService = new AuthService();

    const stompClientRef = useRef<CompatClient | null>(null);

    const fetchPreviousMessages = useCallback(async () => {
        conversationService.getMessages(conversation).then((response) => {
            setMessages(response);
        });
    }, [conversation]);

    const connectWebSocket = useCallback(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(() => socket);
        const username = authService.getCurrentUsername();

        client.connect({}, () => {
            client.subscribe(`/topic/conversation/${conversation.conversationName}`, (message) => {
                const receivedMessage: Message = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);

                if (receivedMessage.sender !== username && receivedMessage.status === 'NOT SEEN') {
                    conversationService.markMessageAsSeen(receivedMessage).then(() => {
                        setMessages((prevMessages) =>
                            prevMessages.map((m) =>
                                m.messageId === receivedMessage.messageId ? { ...m, status: 'SEEN' } : m
                            )
                        );
                    });
                }
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
        <div className="chat-container">
            <div className="messages-container">
                {messages ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === authService.getCurrentUsername() ? 'own-message' : 'other-message'}`}>
                            <div className="message-header">
                                <strong>{msg.sender}</strong>
                            </div>
                            <div className="message-body">
                                {msg.content}
                            </div>
                            <div className="message-status">
                                {msg.status === 'SEEN' ? 'Seen' : 'Delivered'}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-messages">
                        <h2>No messages at the moment</h2>
                    </div>
                )}
            </div>
            <SendMessage conversation={conversation} />
        </div>
    );
};

export default Chat;
