import "react-pro-sidebar/dist/css/styles.css";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";

const Conversation = ({conversationName}: {conversationName: string}) => {
    
    return(
    <MenuItem style={{
        width: "fit-content",
        alignItems: "center"
    }}
    >
        
    </MenuItem>);
};

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
          }}
        >
        <ProSidebar collapsed={true}
        collapsedWidth={"80px"}
        >
            <Menu>
                <Conversation conversationName="user2"/>
            </Menu>
        </ProSidebar>

        </Box>
    );
}