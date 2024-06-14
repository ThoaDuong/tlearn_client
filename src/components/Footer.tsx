import { AutoStories } from "@mui/icons-material"
import { Box, Container, Paper, Typography } from "@mui/material"
import React from "react"

type FooterProps = {
    isPositionFix: boolean
}

export const Footer = ({ isPositionFix }: FooterProps) => {

    return (<React.Fragment>
        <Paper sx={{
            mt: 0,
            width: '100%',
            position: isPositionFix ? 'fixed' : 'static',
            bottom: 0,
            left: 0,
            bgcolor: 'var(--green)',
            color: 'white',
            zIndex: 99
        }} component="footer" id="footer" square variant="outlined">
            <Container maxWidth="lg">
                {/* Display logo icon */}
                <Box sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    display: "flex",
                    mt: 1
                }}>
                    <AutoStories sx={{ fontSize: 'inherit' }} />
                </Box>

                {/* Display copyright text */}
                <Box sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    display: "flex",
                    mb: 1,
                }}>
                    <Typography variant="caption" color="white" sx={{ fontSize: '14px' }}>
                        Copyright ©2024. From TLearn with luv.
                    </Typography>
                </Box>
            </Container>
        </Paper>
    </React.Fragment>)
}