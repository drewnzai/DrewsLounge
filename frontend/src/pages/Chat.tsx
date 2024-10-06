import {useCallback, useEffect, useRef, useState} from 'react';
import {CompatClient, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useLocation} from 'react-router-dom';
import {Conversation} from '../models/Conversation';
import {Message} from '../models/Message';
import AuthService from '../services/AuthService.service';
import ConversationService from '../services/ConversationService.service';
import SendMessage from '../components/SendMessage';
import './Chat.css'; // Import the CSS file for custom styling
import {getMessagesFromIndexedDB, storeMessagesInIndexedDB} from '../indexDB/IndexDBUtils';
import { useConversations } from './Entrypoint';
import { Box, Typography, Button } from '@mui/material';

const Chat = () => {
    const {getConversations} = useConversations();
    const [isPresent, setPresence] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const location = useLocation();
    const conversation: Conversation = location.state;
    const conversationService = new ConversationService();
    const authService = new AuthService();
    const username = authService.getCurrentUsername();

    const stompClientRef = useRef<CompatClient | null>(null);

    const fetchPreviousMessages = useCallback(async () => {

        try{
            const storedMessages: Message[] = await getMessagesFromIndexedDB(conversation.conversationName);

            if(storedMessages.length > 0){
                setMessages(storedMessages);
            }
            else{
                conversationService.getMessages(conversation).then((response) => {
                    setMessages(response);
                    storeMessagesInIndexedDB(response);
                });
            }

        }catch(error){
            console.error('Error fetching messages:', error);
        }
    }, [conversation]);

    const connectWebSocket = useCallback(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(() => socket);

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

    const joinGroup = () => {
        console.log(conversation.conversationName)
    };

    useEffect(() => {
        const currentConversations:Conversation[] = getConversations();

        if(currentConversations.includes(conversation)){
            setPresence(true);
            fetchPreviousMessages();
            const client = connectWebSocket();
    
            return () => {
                if (client) {
                    client.disconnect();
                }
            };
        }

    }, [connectWebSocket, fetchPreviousMessages]);

    return (
        <div className="chat-container">
            {isPresent ? (
                <><div className="messages-container">
                    {messages.length !== 0 ? (
                        messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === authService.getCurrentUsername() ? 'own-message' : 'other-message'}`}>
                                <div className="message-header">
                                    <strong>{msg.sender}</strong>
                                </div>
                                <div className="message-body">
                                    {msg.content}
                                </div>
                                {msg.sender === username && (
                                    <div className="message-status">
                                        {msg.status === 'SEEN' ? 'Seen' : 'Delivered'}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-messages">
                            <h2>No messages at the moment</h2>
                        </div>
                    )}
                </div><SendMessage conversation={conversation} /></>
            ): (
                <>
                    <div
            style={{
                backgroundImage: "url(Base.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff"
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    maxWidth: "800px",
                    borderRadius: "12px",
                    padding: "20px",
                }}
            >
                
                <Button
                    variant="contained"
                    onClick={joinGroup}
                    sx={{
                        backgroundColor: "#5865F2",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "12px 40px",
                        fontSize: "1.2rem",
                        textTransform: "none",
                        borderRadius: "30px",
                        "&:hover": {
                            backgroundColor: "#4752C4",
                        },
                    }}
                >
                    {`Join ${conversation.conversationName}`}
                </Button>
            </Box>
        </div>
                </>
            )}
            </div>
    );
};

export default Chat;
