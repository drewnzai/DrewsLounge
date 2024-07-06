import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import InboxIcon from '@mui/icons-material/Inbox';

export default function Sidebar(){
    
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
                <Typography variant="h6">
                  Chats
                </Typography>
              </MenuItem>

            </Menu>
        </ProSidebar>

        </Box>
    );
}