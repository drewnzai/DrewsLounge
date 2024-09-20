import {useState} from "react";
import ConversationService from "../services/ConversationService.service";
import {Conversation} from "../models/Conversation";
import {Message} from "../models/Message";
import AuthService from "../services/AuthService.service";
import {Box, Button, TextField} from "@mui/material";
import {storeMessagesInIndexedDB} from "../indexDB/IndexDBUtils";

export default function SendMessage({ conversation }: { conversation: Conversation }) {
    const [messageContent, setContent] = useState("");
    const authService = new AuthService();
    const conversationService = new ConversationService();
    
    const sendMessage = () => {
        if (messageContent.trim() === "") return; // Prevent sending empty messages

        const message: Message = {
            sender: authService.getCurrentUsername(),
            messageId: Date.now(),
            content: messageContent,
            conversationName: conversation.conversationName,
            status: "NOT SEEN",
        };
        
        conversationService.sendMessage(message).then(() => {
            setContent('');
            storeMessagesInIndexedDB([message]);
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#2f3136',
                borderTop: '1px solid #40444b'
            }}
        >
            <TextField
                fullWidth
                value={messageContent}
                onChange={(e) => setContent(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                variant="outlined"
                sx={{
                    input: { color: '#fff' },
                    backgroundColor: '#40444b',
                    borderRadius: '4px',
                    marginRight: '10px',
                    '& fieldset': {
                        borderColor: '#72767d',
                    },
                }}
            />
            <Button 
                onClick={sendMessage}
                variant="contained"
                color="primary"
                disabled={messageContent.trim() === ""}
                sx={{
                    backgroundColor: '#7289da',
                    '&:hover': {
                        backgroundColor: '#5b6eae',
                    }
                }}
            >
                Send
            </Button>
        </Box>
    );
}
