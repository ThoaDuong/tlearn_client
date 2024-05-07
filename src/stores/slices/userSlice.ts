import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL; 

export interface userState{
    username: string | any;
    googleId: string | any;
    photo: string | any;
    email: string | any;
    id: string | any;
    isLoading: boolean
}

const initialState: userState = {
    username: '',
    googleId: '',
    photo: '',
    email: '',
    id: '',
    isLoading: false
}

export const fetchUser = createAsyncThunk(
    'fetchUser', 
    async () => {
        const config = {
            method: "get",
            url: `${VITE_SERVER_URL}/login/success`,
            headers: {"Content-type": "application/json; charset=UTF-8"},
            withCredentials: true
        }
        const response = await axios(config);
        return response.data;
    }
) 

export const logoutUser = createAsyncThunk(
    'logoutUser', 
    async () => {
        const config = {
            method: "get",
            url: `${VITE_SERVER_URL}/logout`,
            headers: {"Content-Type": "application/json; charset=UTF-8"},
        }
        const response = await axios(config);
        return response.data;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetchUser | login
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchUser.fulfilled, (state, action: any) => {
            if(action.payload && action.payload.success){
                state.username = action.payload.user.username;
                state.googleId = action.payload.user.googleId;
                state.photo = action.payload.user.photo;
                state.email = action.payload.user.email;
                state.id = action.payload.user._id;
                state.isLoading = false;
            }
        }),
        builder.addCase(fetchUser.rejected, (state, action: any) => {
            console.log('Error fetchUser', action.error.message);
            state.isLoading = false;
        })
        // logout
        // builder.addCase(logoutUser.fulfilled, (state, action: any) => {
        //     console.log('Logged out', action);
        // }),
        // builder.addCase(logoutUser.rejected, (state, action: any) => {
        //     console.log('logout error', action);
        // })
    }
});

export default userSlice.reducer;