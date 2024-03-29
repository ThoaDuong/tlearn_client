import { Box, Button, Stack, Typography } from "@mui/material"
import { Google } from '@mui/icons-material';
import React from "react"


export const LoginPage = () => {

    const handleLogin = () => {
        console.log('Click login');
        const serverUrl = import.meta.env.VITE_SERVER_URL || "";
        window.open(`${serverUrl}/google/login`, "_self");
    }

    return (<React.Fragment>

        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: "90vh" }}
            >
            <Box sx={{ 
                bgcolor: '#9195F6', 
                p: 3,
                color: 'white',
            }}>
                <Typography sx={{mb: 2}} align="center" variant="h5">
                    Join now
                </Typography>
                <Button startIcon={<Google/>} onClick={handleLogin} variant="contained" color="error">
                    Login with Google
                </Button>
                
            </Box>
        </Stack>

    </React.Fragment>)
}
