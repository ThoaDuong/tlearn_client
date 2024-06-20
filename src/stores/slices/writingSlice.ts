import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Writing } from "../../interfaces/Writing";
import axios from "axios";
import { alertDeleteSuccess, alertUpdateSuccess } from "../../utils/SweetAlert";
import { configHeader } from "../../utils/config";


export interface WritingState {
    listWriting: Writing[],
    isAddNewWritingSuccess: boolean,
    isDeleteWritingSuccess: boolean,
    isUpdateWritingSuccess: boolean,
    isLoading: boolean,
    editWritingObject: Writing|null
}

const initialState: WritingState = {
    listWriting: [],
    isAddNewWritingSuccess: false,
    isDeleteWritingSuccess: false,
    isUpdateWritingSuccess: false,
    isLoading: false,
    editWritingObject: null
}

// api fetch
export const fetchWritingListByUserID = createAsyncThunk(
    "fetchWritingListByUserID",
    async (userID: string) => {
        const config = configHeader('get', `/writing/${userID}`);

        const response = await axios(config);
        return response.data;
    }
)

// api add new
export const addNewWriting = createAsyncThunk(
    "addNewWriting",
    async (writingObject: any) => {
        const config = configHeader('post', '/writing', writingObject);

        const response = await axios(config);
        return response.data;
    }
)

// api delete
export const deleteWritingByID = createAsyncThunk(
    "deleteWriting",
    async (writingID: string) => {
        const config = configHeader('delete', `/writing/${writingID}`);

        const response = await axios(config);
        return response.data;
    }
)

// api update
export const updateWriting = createAsyncThunk(
    "updateWriting",
    async (editWritingObject: any) => {
        const config = configHeader('patch', '/writing', editWritingObject);

        const response = await axios(config);
        return response.data;
    }
)

export const writingSlice = createSlice({
    name: 'writing', 
    initialState,
    reducers: {
        setIsAddNewWritingSuccess: (state, action: PayloadAction<boolean>) => {
            state.isAddNewWritingSuccess = action.payload;
        },
        setIsDeleteWritingSuccess: (state, action: PayloadAction<boolean>) => {
            state.isDeleteWritingSuccess = action.payload
        },
        setEditWritingObject: (state, action: PayloadAction<Writing|null>) => {
            state.editWritingObject = action.payload;
        },
        setIsUpdateWritingSuccess: (state, action: PayloadAction<boolean>) => {
            state.isUpdateWritingSuccess = action.payload
        }
    },
    extraReducers: (builder) => {
        // fetch writing list by userID
        builder.addCase(fetchWritingListByUserID.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchWritingListByUserID.fulfilled, (state, action: PayloadAction<Writing[]>) => {
            state.isLoading = false;
            const tempList = action.payload.map((data: any) => ({
                id: data._id,
                content: data.content,
                title: data.title,
                userID: data.userID
            }))

            state.listWriting = tempList.reverse();
        }),
        builder.addCase(fetchWritingListByUserID.rejected, (state, action) => {
            state.isLoading = false,
            console.log('fetch writing error', action);
        }),
        // add new writing
        builder.addCase(addNewWriting.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(addNewWriting.fulfilled, (state) => {
            state.isLoading = false;
            state.isAddNewWritingSuccess = true;

        }),
        builder.addCase(addNewWriting.rejected, (state, action) => {
            state.isLoading = false,
            console.log('add new writing error', action);
        }),
        // delete writing
        builder.addCase(deleteWritingByID.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(deleteWritingByID.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isDeleteWritingSuccess = true;
            alertDeleteSuccess(action.payload.title);
        }),
        builder.addCase(deleteWritingByID.rejected, (state, action) => {
            state.isLoading = false;
            console.log("delete writing error ", action);
        }),
        // update writing
        builder.addCase(updateWriting.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(updateWriting.fulfilled, (state, action:any) => {
            const title = action.meta.arg.title || "";
            alertUpdateSuccess(title);
            state.isLoading = false;
            state.isUpdateWritingSuccess = true;
            state.editWritingObject = null;
        }),
        builder.addCase(updateWriting.rejected, (state, action) => {
            state.isLoading = false;
            console.log('update writing error', action);
        })
    }
})

export const {
    setIsAddNewWritingSuccess,
    setIsDeleteWritingSuccess,
    setIsUpdateWritingSuccess,
    setEditWritingObject
} = writingSlice.actions;

export default writingSlice.reducer;