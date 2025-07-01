import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Vocabulary from "../../interfaces/Vocabulary";
import axios from "axios";
import { alertUpdateSuccess, alertDeleteSuccess } from "../../utils/SweetAlert";
import { configHeader } from "../../utils/config";


export interface VocaState {
    listVoca: Vocabulary[];
    listVocaByPage: Vocabulary[];
    previewVoca: Vocabulary | null;
    editVoca: Vocabulary | null;
    isAddNewVocaSuccess: boolean;
    isDeleteVocaSuccess: boolean;
    isUpdateVocaSuccess: boolean;
    isLoading: boolean;
    isUpdating: boolean;
    totalVoca: number;
    currentPage: number;
    itemPerPage: number;
    keyword: string;
}
const initialState: VocaState = {
    listVoca: [],
    listVocaByPage: [],
    previewVoca: null,
    editVoca: null,
    isAddNewVocaSuccess: false,
    isDeleteVocaSuccess: false,
    isUpdateVocaSuccess: false,
    isLoading: false,
    isUpdating: false,
    totalVoca: 0,
    currentPage: 1,
    itemPerPage: 12,
    keyword: "",
}

export const fetchVocaListByUserID = createAsyncThunk(
    "fetchVocaListByUserID",
    async (userID: string) => {
        const config = configHeader('get', `/vocabulary/${userID}`);
        const response = await axios(config);
        return response.data;
    }
)

export const fetchVocaListByPage = createAsyncThunk(
    "fetchVocaListByPage",
    async ({ userID, page, limit, groupID, keyword }: { userID: string, page: number, limit: number, groupID?: string, keyword?: string }) => {
        const config = configHeader('get', `/vocabulary/page/${userID}?page=${page}&limit=${limit}&groupID=${groupID}&keyword=${keyword}`);
        const response = await axios(config);
        return response.data;
    }
)

export const addNewVoca = createAsyncThunk(
    "addNewVoca",
    async (vocaObject: any) => {
        const config = configHeader('post', '/vocabulary', vocaObject);

        const response = await axios(config);
        return response.data;
    }
)

export const deleteVoca = createAsyncThunk(
    "deleteVoca",
    async (vocaID: string) => {
        const config = configHeader('delete', `/vocabulary/${vocaID}`);

        const response = await axios(config);
        return response.data;
    }
)

export const editVoca = createAsyncThunk(
    "editVoca",
    async (vocaObject: any ) => {
        const config = configHeader('patch', '/vocabulary', vocaObject);

        const response = await axios(config);
        return response.data;
    }
)


export const vocaSlice = createSlice({
    name: 'vocabulary',
    initialState,
    reducers: {
        updatePreviewVoca: (state, action: PayloadAction<Vocabulary|null>) => {
            state.previewVoca = action.payload;
        },
        updateEditVoca: (state, action: PayloadAction<Vocabulary|null>) => {
            state.editVoca = action.payload;
        },
        setIsAddNewVocaSuccess: (state, action: PayloadAction<boolean>) => {
            state.isAddNewVocaSuccess = action.payload;
        },
        setIsDeleteVocaSuccess: (state, action: PayloadAction<boolean>) => {
            state.isDeleteVocaSuccess = action.payload;
        },
        setIsUpdateVocaSuccess: (state, action: PayloadAction<boolean>) => {
            state.isUpdateVocaSuccess = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        }
    },
    extraReducers: (builder) => {
        // fetch vocaList by userID
        builder.addCase(fetchVocaListByUserID.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchVocaListByUserID.fulfilled, (state, action) => {
            let tempList = action.payload.map((data: any) => ({ 
                id: data._id,
                word: data.word,
                type: data.type,
                meaning: data.meaning,
                example: data.example,
                userID: data.userID,
                groupName: data.groupData[0]?.groupName
            }))
            state.listVoca = tempList.reverse();
            state.isLoading = false;
        }),
        builder.addCase(fetchVocaListByUserID.rejected, (state, action) => {
            console.log('fetch Error', state, action);
            state.isLoading = false;
        }),
        // fetch vocaList by page
        builder.addCase(fetchVocaListByPage.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchVocaListByPage.fulfilled, (state, action) => {
            let tempList = action.payload?.vocaData?.map((data: any) => ({
                id: data._id,
                word: data.word,
                type: data.type,
                meaning: data.meaning,
                example: data.example,
                userID: data.userID,
                groupName: data.groupData[0]?.groupName
            }))
            state.listVocaByPage = tempList;
            state.totalVoca = action.payload?.totalVoca;
            state.isLoading = false;
        }),
        builder.addCase(fetchVocaListByPage.rejected, (state, action) => {
            console.log('fetch voca by page error', state, action);
            state.isLoading = false;
        }),
        // add new voca
        builder.addCase(addNewVoca.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(addNewVoca.fulfilled, (state) => {
            state.isAddNewVocaSuccess = true;
            state.isLoading = false;
        }),
        builder.addCase(addNewVoca.rejected, (state, action) => {
            state.isLoading = false;
            console.log('voca reject', action);
        }),
        // delete voca
        builder.addCase(deleteVoca.fulfilled, (state, action) => {
            alertDeleteSuccess(action.payload.word);
            state.isDeleteVocaSuccess = true;
            
        }),
        builder.addCase(deleteVoca.rejected, (state, action) => {
            console.log('del error', state, action);

        }),
        // edit voca
        builder.addCase(editVoca.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(editVoca.fulfilled, (state, action) => {
            const word = state.previewVoca?.word || action.payload.word;
            alertUpdateSuccess(word);
            state.editVoca = null;
            state.previewVoca = null;
            state.isUpdateVocaSuccess = true;
            state.isLoading = false;
        }),
        builder.addCase(editVoca.rejected, (state, action) => {
            state.isLoading = true;
            console.log('edit voca error', action);
        })
    }
})

export const { 
    updatePreviewVoca, 
    setIsAddNewVocaSuccess, 
    setIsDeleteVocaSuccess,
    setIsUpdateVocaSuccess,
    updateEditVoca,
    setCurrentPage,
    setKeyword,
} = vocaSlice.actions;

export default vocaSlice.reducer;