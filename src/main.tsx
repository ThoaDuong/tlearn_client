import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './stores/store';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router"
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

// custom mui theme
const customTheme = createTheme({
    typography: {
        // "fontFamily": `"Mali", cursive`,
        "fontFamily": `"Reddit Sans", sans-serif`
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
