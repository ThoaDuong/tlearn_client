import { Box, Button, Stack, Typography } from "@mui/material"
import learningImg from './../assets/Learning.png'
import React from "react"


export const LoginPage = () => {

    const handleLogin = () => {
        const serverUrl = import.meta.env.VITE_SERVER_URL || "";
        window.open(`${serverUrl}/google/login`, "_self");
    }

    return (<React.Fragment>

        <Box sx={{
            display: 'flex', flexDirection: 'row', gap: 2
        }}>
            {/* Left side */}
            <Box sx={{ display: {xs: 'none', md: 'block'}, width: '50%' }}>
                <Stack 
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: 1, height: "85vh" }}>

                    <img alt="learning" src={learningImg} />
                </Stack>
            </Box>
            {/* Right side */}
            <Box sx={{ width: {xs: '100%', md: '50%'},  }}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: 1, height: "85vh" }}>
                    {/* Login box */}
                    <Box sx={{ 
                        bgcolor: '#EEF5FF', 
                        px: 5,
                        py: 8,
                        color: 'white',
                        borderRadius: '16px'
                    }}>
                        <Typography sx={{mb: 3, color: '#176B87'}} align="center" variant="h6">
                            Login to continue
                        </Typography>

                        <Button variant="outlined" sx={{ bgcolor: "white" }} onClick={handleLogin}>
                            <img width="40" height="40" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                            <Typography sx={{ ml: 2, textTransform: 'none', fontWeight: 'bold' }}>Sign in with Google</Typography>
                        </Button>
                    </Box>
                </Stack>

            </Box>
        </Box>


    </React.Fragment>)
}
