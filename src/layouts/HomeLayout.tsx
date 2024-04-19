import React, { useEffect, useRef } from "react"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import { Container } from "@mui/material"
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


    return userStore.id ?
        (<React.Fragment>
            <Header userStore={userStore} />
            <Container>
                <Outlet />
            </Container>
        </React.Fragment>)
        :
        (<React.Fragment>
            <Header userStore={userStore} />
            <Container>
                <LoginPage />
            </Container>
        </React.Fragment>)
}