import React, { useEffect, useRef } from "react"
import { Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import { fetchUser } from "../stores/slices/userSlice";
import { RedirectToLoginPage } from "./RedirectToLoginPage";

export const GamePage = () => {

    // redux
    const initial = useRef(true);
    const userStore = useSelector((state: RootState) => state.user);
    const distpatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(initial.current) {
            initial.current = false;

            distpatch(fetchUser);
        }
    }, [])

    return(
    <React.Fragment>
        {
            userStore.id ?
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ width: 1, height: "75vh" }}
            >
                <Typography variant="h4">Coming soon</Typography>
            </Stack>
            :
            <RedirectToLoginPage/>
        }
        
    </React.Fragment>
)}