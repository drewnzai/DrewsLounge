import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import InboxIcon from '@mui/icons-material/Inbox';
import { useConversations } from "../pages/Entrypoint";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const { conversations } = useConversations();
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colours.primary[400]} !important`,
                    padding: "15px 0",  // Added padding for better layout
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "10px 35px 10px 20px !important",
                    fontSize: "16px", // Increased font size for better readability
                    color: `${colours.grey[100]}`,
                },
                "& .pro-inner-item:hover": {
                    backgroundColor: `${colours.primary[500]} !important`, // Highlighting on hover
                    color: "#fff !important",  // White text on hover
                    transition: "all 0.3s ease",  // Smooth transition for hover effect
                },
                "& .pro-menu-item.active": {
                    backgroundColor: `${colours.primary[600]} !important`,
                    color: "#fff !important",
                },
                display: "flex",
                height: "100vh",  // Ensure the sidebar takes full viewport height
            }}
        >
            <ProSidebar collapsed={false} width={"250px"} breakPoint="md"> {/* Adjusted width */}
                <Menu iconShape="square">
                    {/* Search Placeholder */}
                    <MenuItem>
                        <Typography variant="h6" sx={{ color: colours.grey[300], paddingLeft: "10px" }}>
                            Search Conversations
                        </Typography>
                    </MenuItem>

                    {/* Inbox Section */}
                    <MenuItem icon={<InboxIcon />}>
                        <Typography variant="h5">Inbox</Typography>
                    </MenuItem>

                    {/* Dynamic Conversations */}
                    {conversations.map((conversation) => (
                        <MenuItem key={conversation.conversationName}>
                            <Link
                                to={`/conversations/@me/${conversation.conversationName}`}
                                state={conversation}
                                style={{
                                    color: colours.grey[100],
                                    textDecoration: "none",
                                }}
                            >
                                <Typography variant="body1">{conversation.conversationName}</Typography>
                            </Link>
                        </MenuItem>
                    ))}
                </Menu>
            </ProSidebar>
        </Box>
    );
}
