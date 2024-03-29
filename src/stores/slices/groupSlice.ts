import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Group from "../../interfaces/Group";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export interface groupState{
    listGroup: Group[],
    tempGroupName: string,
    isUpdateGroupSuccess: boolean,
    isAddNewGroupSuccess: boolean,
    isDeleteGroupSuccess: boolean
}

const initialState: groupState = {
    listGroup: [],
    tempGroupName: "",
    isUpdateGroupSuccess: false,
    isAddNewGroupSuccess: false,
    isDeleteGroupSuccess: false
}

// fetch list groups by user ID
export const fetchGroupsByUserID = createAsyncThunk(
    'fetchGroupsByUserID',
    async (userID: string, thunkAPI) => {
        const response = await axios.get(`${VITE_SERVER_URL}/group/${userID}`);
        return response.data;
    }
)

// add new group
export const addNewGroup = createAsyncThunk(
    'addNewGroup',
    async (groupObject: any, thunkAPI) => {
        const config = {
            method: "post",
            url: `${VITE_SERVER_URL}/group`,
            data: JSON.stringify(groupObject),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
        const response = await axios(config);
        return response.data;
    }
)

// edit group by id
export const editGroupByID = createAsyncThunk(
    'editGroupByID',
    async (groupObject: { groupName:string, groupID: string }, thunkAPI) => {
        const config = {
            method: "put",
            url: `${VITE_SERVER_URL}/group`,
            data: JSON.stringify(groupObject),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }
        const response = await axios(config);
        return response.data;
    }
)

// delete group by id
export const deleteGroupByID = createAsyncThunk(
    "deleteGroupByID",
    async (groupID: string, thunkAPI) => {
        const response = await axios.delete(`${VITE_SERVER_URL}/group/${groupID}`);
        return response.data;
    }
)



// create group slice
const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setIsUpdateGroupSuccess: (state, action: PayloadAction<boolean>) => {
            state.isUpdateGroupSuccess = action.payload;
        },
        setIsAddNewGroupSuccess: (state, action: PayloadAction<boolean>) => {
            state.isAddNewGroupSuccess = action.payload;
        },
        setIsDeleteGroupSuccess: (state, action: PayloadAction<boolean>) => {
            state.isDeleteGroupSuccess = action.payload;
        },
        setTempGroupName: (state, action: PayloadAction<string>) => {
            state.tempGroupName = action.payload;
        }
    },
    extraReducers: (builder) => {
        // handle fetch list group by userID
        builder.addCase(fetchGroupsByUserID.fulfilled, (state, action) => {
            // format group match UI interface
            const groupData: Group[] = action.payload.map((group: any) => ({ 
                id: group._id, 
                groupName: group.groupName, 
                userID: group.userID 
            }));
            state.listGroup = groupData;
        }),
        builder.addCase(fetchGroupsByUserID.rejected, (state, action: any) => {
            console.log('fetch group error', action);
        }),
        // handle add new
        builder.addCase(addNewGroup.fulfilled, (state, action: any) => {
            state.isAddNewGroupSuccess = true;

        }),
        builder.addCase(addNewGroup.rejected, (state, action: any) => {
            console.log('Add new group error', action);
        })
        // delete group by id
        builder.addCase(deleteGroupByID.fulfilled, (state, action: any) => {
            state.isDeleteGroupSuccess = true;
        }),
        builder.addCase(deleteGroupByID.rejected, () => {
            console.log('deleteGroupByID failed');
        }),
        // edit group by id
        builder.addCase(editGroupByID.fulfilled, (state, action: any) => {
            state.isUpdateGroupSuccess = true;
        }),
        builder.addCase(editGroupByID.rejected, (state, action) => {
            console.log('editGroupByID error', action);
        })

    }

})

export const { 
    setIsUpdateGroupSuccess, 
    setIsAddNewGroupSuccess,
    setIsDeleteGroupSuccess,
    setTempGroupName
} = groupSlice.actions;

export default groupSlice.reducer;