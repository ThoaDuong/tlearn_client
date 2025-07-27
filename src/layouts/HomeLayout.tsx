import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Header } from "../components/Header"
import { Outlet, useLocation } from "react-router-dom"
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../stores/store"
import { fetchUser } from "../stores/slices/userSlice"
import { LoginPage } from "../pages/LoginPage"
import { Footer } from "../components/Footer"

export const HomeLayout = () => {

    // variable
    const initial = useRef(true);
    const outletRef = useRef<any>(null);
    const { pathname } = useLocation();
    const [outletHeight, setOutletHeight] = useState(0);

    // redux
    const userStore = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();

    // run 1 time when fully rendered
    useEffect(() => {
        if (initial.current) {
            initial.current = false;

            // get login user information
            dispatch(fetchUser());
        }
    }, []);

    // watch pathname change | for footer position
    useLayoutEffect(() => {
         // get height of content in outlet
        const measureOutletHeight = () => {
            setOutletHeight(outletRef.current?.scrollHeight);
        };

        const observer = new ResizeObserver(measureOutletHeight);
        if (outletRef.current) {
            observer.observe(outletRef.current);
        }

        const mutationObserver = new MutationObserver(measureOutletHeight);
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        measureOutletHeight();

        // clean up
        return () => {
            if (outletRef.current) {
                observer.unobserve(outletRef.current);
            }
            mutationObserver.disconnect();
        };
    }, [pathname]);

   

    return  (<>
        <Header userStore={userStore} />

        <Container>

            {/* fetchUser pending | show loading UI */}
            {userStore.isLoading &&
                <div className="flex justify-center items-center h-screen">
                    <img className="animate-spin w-10 h-10" src="https://img.icons8.com/carbon-copy/100/loading.png" alt="loading"/>
                    <p className="text-2xl font-bold">Loading...</p>
                </div>
                }
                
            
            {/* fetchUser successfully | show data */}
            {/* {!userStore.isLoading && userStore.id && 
            <Stack ref={outletRef}>
                <Outlet/>
            </Stack>
            } */}


            <Stack ref={outletRef}>
                <Outlet/>
            </Stack>

            {/* fetchUser failure | show login page */}
            {/* {!userStore.isLoading && !userStore.id && <LoginPage/>}             */}

           
        </Container>

        <Footer isPositionFix={ outletHeight > window.innerHeight - 100 ? false : true} />
    </>)
}