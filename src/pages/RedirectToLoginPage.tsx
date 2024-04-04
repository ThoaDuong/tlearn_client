import { Box, Button, Stack, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import React from "react"

export const RedirectToLoginPage = () => {
    return (<React.Fragment>
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: "75vh" }}
        >
            <Box sx={{
                borderRadius: "16px",
                backgroundColor: "#EEF5FF",
                px: 6,
                py: 4
            }}>
                <Typography variant="h6"
                sx={{ color: "#176B87", pb: 0.5 }}>
                    Please login to continue!
                </Typography>
                <Button variant="outlined" component={RouterLink} to="login"
                sx={{ borderRadius: "30px", px: 5 }}>
                    Login
                </Button>
                <Box sx={{ float: "right", mt: "-5px" }}>
                    <img width="50" height="50" src="https://img.icons8.com/clouds/100/book.png" alt="book"/>
                </Box>
            </Box>
        </Stack>
    </React.Fragment>)
}