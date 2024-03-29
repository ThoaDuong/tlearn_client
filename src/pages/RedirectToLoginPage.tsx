import { Link, Stack, Typography } from "@mui/material"
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
            <Typography variant="h5">
                Please 
                <Link component={RouterLink} to="login" sx={{ p: 1 }}>login</Link> 
                to use this function
            </Typography>
        </Stack>
    </React.Fragment>)
}