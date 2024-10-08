import {useState} from "react";
import {Box, Button, Divider, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {ConversationRequest} from "../models/ConversationRequest";
import ConversationService from "../services/ConversationService.service";
import {useConversations} from "./Entrypoint";
import {Conversation} from "../models/Conversation";
import UserService from "../services/UserService.service";

export default function Home() {
    const { addConversation } = useConversations();
    const [secondUsername, setSecondUsername] = useState(""); 
    const [groupName, setGroupName] = useState(""); 
    const [users, setUsers] = useState<string[]>([]);

    const conversationService = new ConversationService();
    const userService = new UserService();

    
    const handleSearchUsers = () => {
        if (secondUsername.trim() === "") return;

        userService.searchUsers(secondUsername).then((response) => {
            setUsers(response);
        });
    };

    const handlePrivateConversation = (selectedUser: string) => {
        const conversationRequest: ConversationRequest = {
            username: selectedUser,
            groupName: null
        };

        conversationService.createPrivateConversation(conversationRequest).then((response) => {
            if (response) {
                const newConversation: Conversation = {
                    conversationName: conversationRequest!.username!
                };
                addConversation(newConversation);
            }
        });

        setSecondUsername("");
        setUsers([]);
    };

    const handleCreateGroup = () => {
        if (groupName.trim() === "") return;

        console.log(groupName);

        const conversationRequest: ConversationRequest = {
            username: null,
            groupName: groupName
        }
        
        conversationService.createGroupConversation(conversationRequest).then((response) => {
            if (response) {
                const newGroupConversation: Conversation = {
                    conversationName: groupName
                };
                addConversation(newGroupConversation);
            }
        });

        setGroupName("");
    };

    
    const handleJoinGroup = () => {
        if (groupName.trim() === "") return;

        conversationService.joinGroupConversation(groupName).then((response) => {
            if (response) {
                const newGroupConversation: Conversation = {
                    conversationName: groupName
                };
                addConversation(newGroupConversation);
            }
        });

        setGroupName("");
    };

    return (
        <Box
            sx={{
                padding: '20px',
                margin: 'auto',
                borderRadius: '8px',
            }}
        >
            {/* Search Box for Private Conversation */}
            <Typography variant="h5" gutterBottom>
                Start a Private Conversation
            </Typography>
            <Box display="flex" gap={2} mb={3}>
                <TextField
                    fullWidth
                    label="Search by Username"
                    variant="outlined"
                    value={secondUsername}
                    onChange={(e) => setSecondUsername(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSearchUsers}>
                    Search
                </Button>
            </Box>

            {/* Display Search Results */}
            {users.length > 0 && (
                <Box mb={3}>
                    <Typography variant="subtitle1">Search Results:</Typography>
                    <List>
                        {users.map((user) => (
                            <ListItem
                                key={user}
                                button
                                onClick={() => handlePrivateConversation(user)}
                            >
                                <ListItemText primary={user} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            <Divider />

            {/* Create or Join a Group */}
            <Typography variant="h5" gutterBottom mt={3}>
                Create or Join a Group
            </Typography>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    fullWidth
                    label="Group Name"
                    variant="outlined"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </Box>
            <Box display="flex" justifyContent="space-between" mb={3}>
                <Button variant="contained" color="primary" onClick={handleCreateGroup}>
                    Create Group
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleJoinGroup}>
                    Join Group
                </Button>
            </Box>
        </Box>
    );
}
