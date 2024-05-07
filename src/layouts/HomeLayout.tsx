import React, { useEffect, useRef } from "react"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../stores/store"
import { fetchUser } from "../stores/slices/userSlice"
import { LoginPage } from "../pages/LoginPage"

export const HomeLayout = () => {

    // variable
    const initial = useRef(true);

    // redux
    const userStore = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        if (initial.current) {
            initial.current = false;

            // get login user information
            dispatch(fetchUser());
        }
    }, []);

    return  (<React.Fragment>
        <Header userStore={userStore} />
        <Container>

            {/* fetchUser pending | show loading UI */}
            {userStore.isLoading &&
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: 1, height: "75vh" }}
                >
                    <Box  sx={{ textAlign: 'center' }}>
                        <CircularProgress />
                        <Typography variant="subtitle1">Signing in...</Typography>
                    </Box>
                </Stack>}
            
            {/* fetchUser successfully | show data */}
            {!userStore.isLoading && userStore.id && <Outlet/>}

            {/* fetchUser failure | show login page */}
            {!userStore.isLoading && !userStore.id && <LoginPage/>}            

           
        </Container>
    </React.Fragment>)
}