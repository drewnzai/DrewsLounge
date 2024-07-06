import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Base(){
    const user: any | null = localStorage.getItem("user");

    const navigate = useNavigate();
    
    const login = () => {
        navigate("/login");
    };

    const goHome = () => {
        navigate("/conversations/@me");
    };

    return(
        <div className="app"
            style={{
                backgroundImage: "url(base.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100% 100vh"
            }}
        >

            <main className="content">
                <Box display={"flex"}
                mt={"350px"}
                ml={"550px"}
                >


                  {user? 
                  
                  <button className="button" onClick={goHome}>
                    <Typography variant="h6">
                        Open Lounge
                    </Typography>
                  </button>
                  
                  : <button className="button" onClick={login}>
                    <Typography variant="h6">
                        Login
                    </Typography>
                  </button>
              }
                </Box>
                
            </main>

        </div>
    );
}