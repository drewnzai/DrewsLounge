import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';


const Chat = ({ conversationId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [conversationName, setConversationName] = useState('');

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe(`/topic/conversation/${conversationId}`, (msg) => {
                setMessages((prevMessages) => [...prevMessages, JSON.parse(msg.body)]);
            });
        });

        setStompClient(client);

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [conversationId, stompClient]);

    const sendMessage = () => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:8080/send-message', {
            senderId: user.id,
            content: message,
            conversationId: conversationId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setMessage('');
    };

    const handleCreateConversation = async () => {
        const response = await createConversation(conversationName);
        const conversation = response.data;
        await addUserToConversation(conversation.id, user.id);
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender.username}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
            <div>
                <input type="text" value={conversationName} onChange={(e) => setConversationName(e.target.value)} placeholder="New Conversation Name" />
                <button onClick={handleCreateConversation}>Create Conversation</button>
            </div>
        </div>
    );
};

export default Chat;
