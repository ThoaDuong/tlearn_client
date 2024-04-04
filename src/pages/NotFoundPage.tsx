import { Box, Link, Stack, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import React from "react"

export const NotFoundPage = () => {
    return <React.Fragment>
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: '90vh' }}
        >
            <Box sx={{
                borderRadius: "16px",
                backgroundColor: "#EEF5FF",
                px: 6,
                py: 4
            }}>
                <Typography variant="h4"
                sx={{ color: "#176B87", pb: 2 }}>
                    404! Page Not Found
                </Typography>
                <Typography component="div" sx={{ display: 'flex', gap: 0.5 }}>
                    <Typography>Please go back to </Typography>
                    <Link component={RouterLink} to="/">Homepage</Link>
                </Typography>
                <Box sx={{ float: "right", mt: "-35px" }}>
                    <img width="50" height="50" src="https://img.icons8.com/clouds/100/book.png" alt="book"/>
                </Box>
            </Box>
        </Stack>
    </React.Fragment>
 }