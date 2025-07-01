import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Group from "../../interfaces/Group";
import { configHeader } from "../../utils/config";


export interface groupState{
    listGroup: { group: Group, totalVoca: number }[],
    tempGroupName: string,
    tempGroup: Group|null,
    activeGroupTab: Group|null,
    isUpdateGroupSuccess: boolean,
    isAddNewGroupSuccess: boolean,
    isDeleteGroupSuccess: boolean
}

const initialState: groupState = {
    listGroup: [],
    tempGroupName: "",
    tempGroup: null,
    activeGroupTab: null,
    isUpdateGroupSuccess: false,
    isAddNewGroupSuccess: false,
    isDeleteGroupSuccess: false
}

// fetch list groups by user ID
export const fetchGroupsByUserID = createAsyncThunk(
    'fetchGroupsByUserID',
    async (userID: string ) => {
        const config = configHeader('get', `/group/${userID}`);

        const response = await axios(config);
        return response.data;
    }
)

// add new group
export const addNewGroup = createAsyncThunk(
    'addNewGroup',
    async (groupObject: any ) => {
        const config = configHeader('post', '/group', groupObject);
        
        const response = await axios(config);
        return response.data;
    }
)

// edit group by id
export const editGroupByID = createAsyncThunk(
    'editGroupByID',
    async (groupObject: { groupName:string, groupID: string } ) => {
        const config = configHeader('patch', '/group', groupObject);

        const response = await axios(config);
        return response.data;
    }
)

// delete group by id
export const deleteGroupByID = createAsyncThunk(
    "deleteGroupByID",
    async (groupID: string ) => {
        const config = configHeader('delete', `/group/${groupID}`);

        const response = await axios(config);
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
        },
        setTempGroup: (state, action: PayloadAction<Group|null>) => {
            state.tempGroup = action.payload;
        },
        setActiveGroupTab: (state, action: PayloadAction<Group|null>) => {
            state.activeGroupTab = action.payload;
        }
    },
    extraReducers: (builder) => {
        // handle fetch list group by userID
        builder.addCase(fetchGroupsByUserID.fulfilled, (state, action) => {
            // format group match UI interface
            const groupData: { group: Group, totalVoca: number }[] = action.payload.map((data: any) => ({
                group: {
                    id: data.group?._id,
                    groupName: data.group?.groupName,
                    userID: data.group?.userID
                },
                totalVoca: data.totalVoca
            }));
            state.listGroup = groupData;
        }),
        builder.addCase(fetchGroupsByUserID.rejected, (state, action: any) => {
            console.log('fetch group error', state, action);
        }),
        // handle add new
        builder.addCase(addNewGroup.fulfilled, (state) => {
            state.isAddNewGroupSuccess = true;
        }),
        builder.addCase(addNewGroup.rejected, (state, action: any) => {
            console.log('Add new group error', state, action);
        })
        // delete group by id
        builder.addCase(deleteGroupByID.fulfilled, (state) => {
            state.isDeleteGroupSuccess = true;
        }),
        builder.addCase(deleteGroupByID.rejected, (state, action) => {
            console.log('deleteGroupByID failed', state, action);
        }),
        // edit group by id
        builder.addCase(editGroupByID.fulfilled, (state) => {
            state.isUpdateGroupSuccess = true;
            //const group = { ...action.payload, groupName: action.meta.arg.groupName };
        }),
        builder.addCase(editGroupByID.rejected, (state, action) => {
            console.log('editGroupByID error', state, action);
        })

    }

})

export const { 
    setIsUpdateGroupSuccess, 
    setIsAddNewGroupSuccess,
    setIsDeleteGroupSuccess,
    setTempGroupName,
    setTempGroup,
    setActiveGroupTab
} = groupSlice.actions;

export default groupSlice.reducer;