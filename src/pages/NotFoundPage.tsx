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
            <Box>
                <Typography variant="h4">404! Page Not Found</Typography>
                <Typography component="div" sx={{ display: 'flex', gap: 0.5 }}>
                    <Typography>Please go back to </Typography>
                    <Link component={RouterLink} to="/">Homepage</Link>
                </Typography>
            </Box>
        </Stack>
    </React.Fragment>
 }