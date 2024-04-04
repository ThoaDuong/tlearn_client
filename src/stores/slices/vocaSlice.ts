import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Vocabulary from "../../interfaces/Vocabulary";
import axios from "axios";
import { alertUpdateSuccess, alertDeleteSuccess } from "../../utils/SweetAlert";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export interface VocaState {
    listVoca: Vocabulary[],
    newVoca: Vocabulary | null;
    editVoca: Vocabulary | null;
    isAddNewVocaSuccess: boolean;
    isDeleteVocaSuccess: boolean;
    isUpdateVocaSuccess: boolean;
}
const initialState: VocaState = {
    listVoca: [],
    newVoca: null,
    editVoca: null,
    isAddNewVocaSuccess: false,
    isDeleteVocaSuccess: false,
    isUpdateVocaSuccess: false,
}

export const fetchVocaListByUserID = createAsyncThunk(
    "fetchVocaListByUserID",
    async (userID: string) => {
        const response = await axios.get(`${VITE_SERVER_URL}/vocabulary/${userID}`);
        return response.data;
    }
)

export const addNewVoca = createAsyncThunk(
    "addNewVoca",
    async (vocaObject: any) => {
        const config = {
            method: "post",
            url: `${VITE_SERVER_URL}/vocabulary`,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            data: JSON.stringify(vocaObject)
        }
        const response = await axios(config);
        return response.data;
    }
)

export const deleteVoca = createAsyncThunk(
    "deleteVoca",
    async (vocaID: string) => {
        const config = {
            method: "delete",
            url: `${VITE_SERVER_URL}/vocabulary/${vocaID}`,
            headers: {
                "Content-Type": "application/json; charset:UTF-8"
            }
        }
        const response = await axios(config);
        return response.data;
    }
)

export const editVoca = createAsyncThunk(
    "editVoca",
    async (vocaObject: any ) => {
        const config = {
            method: "patch",
            url: `${VITE_SERVER_URL}/vocabulary`,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            data: JSON.stringify(vocaObject)
        }
        const response = await axios(config);
        return response.data;
    }
)


export const vocaSlice = createSlice({
    name: 'vocabulary',
    initialState,
    reducers: {
        updateNewVoca: (state, action: PayloadAction<Vocabulary|null>) => {
            state.newVoca = action.payload;
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
        }
    },
    extraReducers: (builder) => {
        // fetch vocaList by userID
        builder.addCase(fetchVocaListByUserID.fulfilled, (state, action) => {
            state.listVoca = action.payload.map((data: any) => ({ 
                id: data._id,
                word: data.word,
                type: data.type,
                meaning: data.meaning,
                example: data.example,
                userID: data.userID,
                groupName: data.groupData[0]?.groupName
            }))
        }),
        builder.addCase(fetchVocaListByUserID.rejected, (state, action) => {
            console.log('fetch Error', state, action)
        }),
        // add new voca
        builder.addCase(addNewVoca.fulfilled, (state) => {
            state.isAddNewVocaSuccess = true;
        }),
        builder.addCase(addNewVoca.rejected, (state, action) => {
            console.log('voca reject', state, action)
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
        builder.addCase(editVoca.fulfilled, (state, action) => {
            const word = state.newVoca?.word || action.payload.word;
            alertUpdateSuccess(word);
            state.editVoca = null;
            state.newVoca = null;
            state.isUpdateVocaSuccess = true;
        }),
        builder.addCase(editVoca.rejected, (state, action) => {
            console.log('edit voca error', state, action);
        })
    }
})

export const { 
    updateNewVoca, 
    setIsAddNewVocaSuccess, 
    setIsDeleteVocaSuccess,
    setIsUpdateVocaSuccess,
    updateEditVoca,
} = vocaSlice.actions;

export default vocaSlice.reducer;