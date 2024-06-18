import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './stores/store';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router"
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TagManager from 'react-gtm-module'
 
// google tag manager
const tagManagerArgs = {
    gtmId: 'GTM-T3P79B49'
}
TagManager.initialize(tagManagerArgs)

// custom mui theme
const customTheme = createTheme({
    typography: {
        // "fontFamily": `"Mali", cursive`,
        "fontFamily": `"Reddit Sans", sans-serif`
    },
    palette: {
        primary: {
            light: '#e7f4f4', /* light green */
            main: '#49afa9', /* green */
            dark: '#49afa9', /* green */
            contrastText: '#fff',
        },
        error: {
            light: '#feeeee', /* light pink */
            main: '#F78989', /* dark pink */
            dark: '#F78989', /* dark pink */
            contrastText: '#fff',
        }
    }
 });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
