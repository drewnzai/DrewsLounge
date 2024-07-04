import Box from "@mui/material/Box";

export default function AccountVerification(){


    return(
        <>
        <div className="app">
            <div className="content">
                <Box display={"flex"}
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "3px"
             }}>
                <Box
                    sx={{
                        borderRadius: "9px",
                        alignItems: "center",
                        justifyContent: "center"
                }}>

                    <h1>
                        Verify your account through the email sent to your email
                    </h1>

                </Box>

                </Box>
            </div>
        </div>
        
        </>
    );
}