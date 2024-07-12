import "react-pro-sidebar/dist/css/styles.css";
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import InboxIcon from '@mui/icons-material/Inbox';
import {useConversations} from "../pages/Entrypoint";
import {Link} from "react-router-dom";

export default function Sidebar(){
    const { conversations } = useConversations();
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    return(
        <Box
        sx={{
            "& .pro-sidebar-inner": {
              background: `${colours.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
              color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
              color: "#6870fa !important",
            },
            display: "flex"
          }}
        >
        <ProSidebar collapsed={false}
        width={"190px"}
        >
            <Menu>
              <MenuItem>
                {/* TO_DO: Implement a way to find users by username */}
                Search or find convo

              </MenuItem>
              
              <MenuItem
              icon={<InboxIcon/>}
              >
                <Typography variant="h5">
                  Inbox
                </Typography>
                </MenuItem>
                
                {conversations.map(
                  (conversation) => (
                    <Link
                    key={conversation.conversationName}
                    to={`/conversations/@me/${conversation.conversationName}`}
                    state={conversation}
                    >
                    <MenuItem>
                    <div>{conversation.conversationName}</div>
                  </MenuItem>
                    </Link>
                  )
                )
              }


            </Menu>
        </ProSidebar>

        </Box>
    );
}