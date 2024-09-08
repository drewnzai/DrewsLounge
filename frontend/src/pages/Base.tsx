import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Base() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = () => {
        navigate("/login");
    };

    const goHome = () => {
        navigate("/conversations/@me");
    };

    return (
        <div
            className="app"
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
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "12px",
                    padding: "20px",
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
                >
                    Welcome to the Lounge
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                        marginBottom: "20px",
                    }}
                >
                    Your space to chat, connect, and explore conversations with your friends. 
                </Typography>
                
                <Button
                    variant="contained"
                    onClick={user ? goHome : login}
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
                    {user ? "Open Lounge" : "Login"}
                </Button>
            </Box>
        </div>
    );
}
