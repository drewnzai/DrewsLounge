import "react-pro-sidebar/dist/css/styles.css";
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import InboxIcon from '@mui/icons-material/Inbox';
import {useConversations} from "../pages/Entrypoint";
import {Link} from "react-router-dom";
import AuthService from "../services/AuthService.service";

export default function Sidebar() {
    const { conversations } = useConversations();
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const authService = new AuthService();
    const currentUsername = authService.getCurrentUsername();

    const presentName = (conversationName: string): string => {
        if(conversationName.includes("-")){
            const participants = conversationName.split('-');
        
            const otherUser = participants.filter(username => username !== currentUsername);
        
            return otherUser.join('');
        }
        else{
            return conversationName;
        }
    }

    
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colours.primary[500]} !important`,
                    padding: "15px 0",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "10px 35px 10px 20px !important",
                    fontSize: "16px",
                    color: `${colours.grey[100]}`,
                },
                "& .pro-inner-item:hover": {
                    backgroundColor: `${colours.primary[500]} !important`,
                    color: "#fff !important",
                    transition: "all 0.3s ease",
                },
                "& .pro-menu-item.active": {
                    backgroundColor: `${colours.primary[600]} !important`,
                    color: "#fff !important",
                },
                display: "flex",
                height: "100vh",
            }}
        >
            <ProSidebar collapsed={false} width={"250px"} breakPoint="md">
                <Menu iconShape="square">
                    
                    <MenuItem icon={<InboxIcon />}>
                        <Typography variant="h5">Inbox</Typography>
                    </MenuItem>

                    {conversations.map((conversation) => (
                        <MenuItem key={conversation.conversationName}>
                            <Link
                                to={`/conversations/@me/${presentName(conversation.conversationName)}`}
                                state={conversation}
                                style={{
                                    color: colours.grey[100],
                                    textDecoration: "none",
                                }}
                            >
                                <Typography variant="body1">{presentName(conversation.conversationName)}</Typography>
                            </Link>
                        </MenuItem>
                    ))}
                </Menu>
            </ProSidebar>
        </Box>
    );
}
