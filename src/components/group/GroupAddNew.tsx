import { Add, Cancel, SaveAs } from "@mui/icons-material"
import { Box, Button, FormControl, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import { addNewGroup, editGroupByID, fetchGroupsByUserID, setTempGroupName } from "../../stores/slices/groupSlice";

export const GroupAddNew = ( props: any ) => {
    // variable
    const [group, setGroup] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //redux
    const userStore = useSelector((state: RootState) => state.user);
    const groupStore: any = useSelector((state: RootState) => state.group);
    const dispatch: AppDispatch = useDispatch();

    // watch editGroup object change
    useEffect(() => {
        const groupName = props.editGroup ? props.editGroup.groupName : "";
        setGroup(groupName);
        
    }, [props.editGroup]) 

    // watch isAddNewGroupSuccess change | true
    useEffect(() => {
        if(groupStore.isAddNewGroupSuccess){
            dispatch(setTempGroupName(group));
            dispatch(fetchGroupsByUserID(userStore.id));
            setGroup("");
            setErrorMessage("");
        }
    }, [groupStore.isAddNewGroupSuccess]);
    
    // watch isUpdateGroupSuccess change | true
    useEffect(() => {
        if(groupStore.isUpdateGroupSuccess){
            dispatch(setTempGroupName(group));
            dispatch(fetchGroupsByUserID(userStore.id));
            setGroup("");
            setErrorMessage("");
        }
    }, [groupStore.isUpdateGroupSuccess]);


    // handle function
    const handleSaveAddGroup = (event: any) => {
        event.preventDefault();

        if(!group){
            setErrorMessage('The group name field cannot be empty.');
            return;
        }

        const groupObject = {
            groupName: group,
            userID: userStore.id
        }
        dispatch(addNewGroup(groupObject));
    }

    const handleSaveEditGroup = (event: any) => {
        event.preventDefault();

        if(!group){
            setErrorMessage('The group name field cannot be empty.');
            return;
        }
        if(group === props.editGroup.groupName){
            setErrorMessage('The group name field has not changed.');
            return;
        }

        const groupObject = {
            groupName: group,
            groupID: props.editGroup ? props.editGroup.id : ""
        }
        dispatch(editGroupByID(groupObject));
    }

    const handleCancelSave = () => {
        props.onCancelSaveToParent(true);
        setGroup("");
        setErrorMessage("");
    }

    return (<React.Fragment>
        <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
                Add new group
            </Typography>
            <Box component="form" onSubmit={props.editGroup ? handleSaveEditGroup : handleSaveAddGroup}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField variant="outlined" id="new" label="New group"
                        value={group}
                        onChange={(event) => setGroup(event.target.value)}
                    />
                    <Typography color="error"> {errorMessage} </Typography>
                </FormControl>

                <Button type="button" startIcon={<Cancel />} variant="contained" color="error"
                    onClick={handleCancelSave}
                >
                    Cancel
                </Button>
                {!props.editGroup ?
                    <Button type="submit" startIcon={<Add />} variant="contained" sx={{ ml: 1 }}>
                        Add
                    </Button>
                    :
                    <Button type="submit" startIcon={<SaveAs />} variant="contained" sx={{ ml: 1 }}>
                        Save
                    </Button>
                }
            </Box>
        </Box>
    </React.Fragment>)
}