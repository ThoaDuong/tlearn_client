import React from "react"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import { Container } from "@mui/material"

export const HomeLayout = () => {

    return (<React.Fragment>
        <Header />
        
        <Container>
            <Outlet />
        </Container>
    </React.Fragment>)
}