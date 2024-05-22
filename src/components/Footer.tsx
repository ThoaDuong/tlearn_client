import { AutoStories } from "@mui/icons-material"
import { Box, Container, Paper, Typography } from "@mui/material"
import React from "react"

export const Footer = () => {
    return (<React.Fragment>
        <Paper sx={{
            mt: 3,
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            bgcolor: '#1976d2',
            color: 'white',
            zIndex: 99
        }} component="footer" square variant="outlined">
            <Container maxWidth="lg">
                {/* Display logo icon */}
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        my: 1
                    }}
                >
                    <AutoStories />
                </Box>

                {/* Display copyright text */}
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 1,
                    }}
                >
                    <Typography variant="caption" color="white" sx={{ fontSize: '14px' }}>
                        Copyright ©2024. From TLearn with luv.
                    </Typography>
                </Box>
            </Container>
        </Paper>
    </React.Fragment>)
}