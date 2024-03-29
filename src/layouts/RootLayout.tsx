import React from "react"
import { Outlet } from "react-router-dom"

export const RootLayout = () => {

    return (<React.Fragment>
        <Outlet/>
    </React.Fragment>)
}