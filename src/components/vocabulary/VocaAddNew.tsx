import React, { useEffect, useRef, useState } from "react"
import { Add, Cancel, Delete, Edit, Save } from "@mui/icons-material"
import { Box, Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from "@mui/material"
import VocaCard from "./VocaCard"
import { useSelector, useDispatch } from "react-redux"
import { groupState, deleteGroupByID, fetchGroupsByUserID, setIsAddNewGroupSuccess, setIsDeleteGroupSuccess, setIsUpdateGroupSuccess, setTempGroupName } from "../../stores/slices/groupSlice"
import { AppDispatch, RootState } from "../../stores/store"
import { addNewVoca, editVoca, setIsAddNewVocaSuccess, setIsUpdateVocaSuccess, updateEditVoca, updatePreviewVoca } from "../../stores/slices/vocaSlice"
import { useNavigate } from "react-router-dom"
import Group from "../../interfaces/Group"
import { alertAddNewSuccess, alertConfirmDelete, alertDeleteGroupError, alertDeleteSuccess, alertUpdateSuccess } from "../../utils/SweetAlert"
import { GroupAddNew } from "../group/GroupAddNew"
import Vocabulary from "../../interfaces/Vocabulary"


export const VocaAddNew = () => {

    // variable
    const listType = useRef(["Noun", "Pronoun", "Verb", "Adjective", "Adverb", "Preposition", "Other"]);
    const navigate = useNavigate();
    const [errorObject, setErrorObject] = useState({
        wordMessage: "",
        meaningMessage: "",
        exampleMessage: ""
    })

    // redux store
    const dispatch: AppDispatch = useDispatch();
    const userStore = useSelector((state: RootState) => state.user);
    const groupStore: groupState = useSelector((state: RootState) => state.group);
    const vocaStore = useSelector((state: RootState) => state.vocabulary);

    //vocabulary fields
    const [word, setWord] = useState("");
    const [type, setType] = useState("");
    const [groupName, setGroupName] = useState("");
    const [meaning, setMeaning] = useState("");
    const [example, setExample] = useState("");

    //group field
    const [isShowAddGroup, setIsShowAddGroup] = useState(false);
    const [editGroup, setEditGroup] = useState<Group|null>(null);


    

    // watch userStore change
    useEffect(() => {
        if(userStore){
            dispatch(fetchGroupsByUserID(userStore.id));
        }
    }, [userStore])

    // VOCABULARY WATCH

    // watch voca isAddNewVocaSuccess change | true
    useEffect(() => {        
        if(vocaStore.isAddNewVocaSuccess){
            alertAddNewSuccess(word);
            clearVocaField();
            dispatch(setIsAddNewVocaSuccess(false));
        }
    }, [vocaStore.isAddNewVocaSuccess]);

    // watch isUpdateVocaSuccess change | true
    useEffect(() => {
        if(vocaStore.isUpdateVocaSuccess){
            dispatch(setIsUpdateVocaSuccess(false));
            clearVocaField();
            navigate(-1);
        }
    }, [vocaStore.isUpdateVocaSuccess])

    // watch voca field change
    useEffect(() => {
        const previewVocaObject = {
            id: "",
            word: word,
            type: type,
            meaning: meaning,
            example: example,
            groupName: groupName,
            userID: userStore.id
        };
        dispatch(updatePreviewVoca(previewVocaObject));
    }, [word, type, groupName, meaning, example]);

    // watch editVoca change
    useEffect(() => {
        if(vocaStore.editVoca){
            setWord(vocaStore.editVoca.word);
            setExample(vocaStore.editVoca.example);
            setType(vocaStore.editVoca.type || "");
            setMeaning(vocaStore.editVoca.meaning);
        }
    }, [vocaStore.editVoca])


    // GROUP WATCH
    // watch listGroup change 
    useEffect(() => {
        // fetch listGroup success
        if(groupStore.listGroup.length > 0){
            const data = groupStore.listGroup.filter(g => g.group.groupName === groupStore.tempGroupName);
            
            // Case: add new group success 
            if(groupStore.isAddNewGroupSuccess && data){
                alertAddNewSuccess(groupStore.tempGroupName);
                reassignNewGroupField();
                dispatch(setIsAddNewGroupSuccess(false));
            }
            // Case: update group success
            if(groupStore.isUpdateGroupSuccess){
                alertUpdateSuccess(groupStore.tempGroupName);
                reassignNewGroupField();
                dispatch(setIsUpdateGroupSuccess(false));
                setEditGroup(null);
            }
            // Case: edit voca
            if(vocaStore.editVoca){
                setGroupName(vocaStore.editVoca.groupName || "");
            }
        }

    }, [groupStore.listGroup]);

    // watch isDeleteGroupSuccess | true
    useEffect(() => {
        if(groupStore.isDeleteGroupSuccess){
            dispatch(fetchGroupsByUserID(userStore.id));
            dispatch(setIsDeleteGroupSuccess(false));
            alertDeleteSuccess(groupStore.tempGroupName);
            setGroupName("");
            dispatch(setTempGroupName(""));
        }
    }, [groupStore.isDeleteGroupSuccess]);


    // VOCABULARY FUNCTION
    // clear voca fields
    const clearVocaField = () => {
        setExample("");
        setWord("");
        setType("");
        setMeaning("");
        setGroupName("");
    }

    // check validate voca |
    const checkValidateVoca = () => {
        if(!word){
            setErrorObject({
                ...errorObject,
                wordMessage: "The word field cannot be empty.",
            });
            return false;
        }
        if(!meaning){
            setErrorObject({
                ...errorObject,
                wordMessage: "",
                meaningMessage: "The meaning field cannot be empty.",
            });
            return false;
        }
        if(!example){
            setErrorObject({
                wordMessage: "",
                meaningMessage: "",
                exampleMessage: "The meaning field cannot be empty.",
            });
            return false;
        }

        // validate | true
        setErrorObject({
            wordMessage: "",
            meaningMessage: "",
            exampleMessage: ""
        })
        return true;
    }


    // instance for add new voca only
    type VocaObjectType = {
        word: string,
        meaning: string,
        example: string,
        userID: string,
        type?: string,
        groupID?: string,
        id?:string
    }
    const handleAddNewVoca = (event: any) => {
        event.preventDefault();
        
        const isValid = checkValidateVoca();
        if(isValid){
            
            const groupResult = groupStore.listGroup.filter(g => g.group.groupName === groupName);
            let vocaObject: VocaObjectType = {
                word: word,
                meaning: meaning,
                example: example,
                userID: userStore.id,
            }
            if(type){
                vocaObject["type"] = type;
            }
            if(groupResult[0]){
                vocaObject["groupID"] = groupResult[0].group.id;
            }

            dispatch(addNewVoca(vocaObject));
        }
    }

    const handleSaveEditVoca = (event: any) => {
        event.preventDefault();

        const isValid = checkValidateVoca();
        if(isValid){
            const groupResult= groupStore.listGroup.filter(g => g.group.groupName === groupName);
            let vocaObject: VocaObjectType = {
                id: vocaStore.editVoca?.id,
                word: word,
                meaning: meaning,
                example: example,
                userID: userStore.id
            }
            if(type){
                vocaObject["type"] = type;
            }
            if(groupResult[0]){
                vocaObject["groupID"] = groupResult[0].group.id;
            }
            dispatch(editVoca(vocaObject));
        }
    }

    const handleGoBack = () => {
        clearVocaField();
        dispatch(updatePreviewVoca(null));
        dispatch(updateEditVoca(null));
        navigate(-1);
    }

    // GROUP FUNCTION
    // reset group field in voca after add new | update group success
    const reassignNewGroupField = () => {
        setGroupName(groupStore.tempGroupName);
        dispatch(setTempGroupName(""));
        setIsShowAddGroup(false);
    }

    const callbackConfirmDeleteGroup = (isConfirm: boolean, name:string) => {
        if(isConfirm) {
            const groupResult = groupStore.listGroup.filter(g => g.group.groupName === name);
            if(groupResult.length > 0){
                dispatch(deleteGroupByID(groupResult[0].group.id));
            }
        }
    }
    
    const handleDeleteGroupItem = (group: Group) => {
        // check any vocabulary in this group
        const listVocaGroup = vocaStore.listVoca.filter((voca: Vocabulary) => voca.groupName === group.groupName);
        const listVocaWordStr = listVocaGroup.map((voca: Vocabulary) => (voca.word));

        if(listVocaGroup.length > 0){
            alertDeleteGroupError(group.groupName, listVocaWordStr.toString());
        }else{
            dispatch(setTempGroupName(group.groupName));
            alertConfirmDelete(group.groupName, callbackConfirmDeleteGroup);
        }

    }

    const handleEditGroupItem = (group: Group) => {
        setIsShowAddGroup(true);
        setEditGroup(group);
    }

    const handleShowAddGroup = () => {
        setIsShowAddGroup(true);
    }

    // trigger on child component: GroupAddNew
    const handleCancelSaveGroup = (isCancelSaveGroup: boolean) => {
        if(isCancelSaveGroup){
            setIsShowAddGroup(false);
            setEditGroup(null);
        }
    }

 

    return (<React.Fragment>
        <Grid container spacing={3}>
            {/* Display voca | left side */}
            <Grid item xs={12} md={6}>

                {/* Display add/edit group */}
                { isShowAddGroup && <GroupAddNew 
                    onCancelSaveToParent={handleCancelSaveGroup}
                    editGroup={editGroup}
                /> }
            

                {/* Display voca title */}
                <Typography variant="h6" sx={{ my: 2 }}>
                    Add new vocabulary
                </Typography>

                {/* Display add new voca field */}
                <Box component="form" onSubmit={vocaStore.editVoca ? handleSaveEditVoca : handleAddNewVoca}>
                    {/* Field: word */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField variant="outlined" id="new" label="New word" 
                            value={word}
                            onChange={(event) => setWord(event.target.value)}
                        />
                        <Typography color="error"> {errorObject.wordMessage} </Typography>
                    </FormControl>

                    {/* Field: type | parts of speech */}
                    <FormControl sx={{ mb: 2, width: {xs: '100%', md: '50%'} }}>
                        <InputLabel id="typeInput">Parts of speech</InputLabel>
                        <Select id="typeSelect" labelId="typeInput" label="Parts of speech"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                        >
                            <MenuItem aria-label="None" value="">
                                <em>None</em>
                            </MenuItem>
                            {listType.current.map((type: string) => (
                                <MenuItem value={type} key={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Field: group name */}
                    <FormControl sx={{ mb: 2, width: {xs: '100%', md: '50%'} }}>
                        <InputLabel id="groupInput">Group</InputLabel>
                        <Select id="groupSelect" labelId="groupInput" label="Group"
                            value={groupName}
                        >
                            <MenuItem aria-label="None" value="" onClick={() => {setGroupName("")}}>
                                <em>None</em>
                            </MenuItem>

                            {groupStore.listGroup.map((item: { group: Group, totalVoca: number }) => (
                                <MenuItem key={item.group.id} value={item.group.groupName}
                                sx={{ display: 'flex' , justifyContent: 'space-between' }}>
                                    <Typography sx={{ width: '50%' }} onClick={() => setGroupName(item.group.groupName)}>
                                        {item.group.groupName}
                                    </Typography>
                                    {groupName !== item.group.groupName &&
                                        <Stack sx={{ width: '50%' }} >
                                            <Toolbar sx={{ display: 'flex' }}>

                                                <IconButton aria-label="delete" size="small"
                                                    onClick={() => handleDeleteGroupItem(item.group)}
                                                >
                                                    <Delete fontSize="inherit" />
                                                </IconButton>
                                                <IconButton aria-label="edit" size="small"
                                                    onClick={() => handleEditGroupItem(item.group)}
                                                >
                                                    <Edit fontSize="inherit" />
                                                </IconButton>
                                            </Toolbar>
                                            
                                            
                                        </Stack>
                                    }
                                        
                                </MenuItem>
                            ))}

                            {/* Display show add new group button */}
                            <Button onClick={handleShowAddGroup}>
                                Add new group
                            </Button>
                        </Select>
                    </FormControl>

                    {/* Field: meaning */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField variant="outlined" id="meaning" label="Meaning" multiline rows={3} 
                            value={meaning}
                            onChange={(event) => setMeaning(event.target.value)}
                        />
                        <Typography color="error"> {errorObject.meaningMessage} </Typography>
                    </FormControl>

                    {/* Field: example */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField variant="outlined" id="example" label="Example" multiline rows={4} 
                            value={example}
                            onChange={(event) => setExample(event.target.value)}
                        />
                        <Typography color="error"> {errorObject.exampleMessage} </Typography>
                    </FormControl>

                    {/* Display submit button */}
                    <Box sx={{ display: 'flex' }}>

                        {/* Display button */}
                        <Button type="button" startIcon={<Cancel />} variant="contained" color="error"
                            sx={{ borderRadius: "30px", px: 3 }}
                            onClick={ handleGoBack }>
                            Go Back
                        </Button>

                        { !vocaStore.editVoca ?
                        <Button type="submit" startIcon={<Add />} variant="contained" 
                            sx={{ ml:1, borderRadius: "30px", px: 3 }}>
                            Add
                        </Button>
                        :
                        <Button type="submit" startIcon={<Save />} variant="contained" 
                            sx={{ ml:1, borderRadius: "30px", px: 3 }}>
                            Save
                        </Button> }

                        {/* Display loading */}
                        { vocaStore.isLoading && <CircularProgress sx={{ ml:1 }} />}
                    </Box>
                    
                </Box>

            </Grid>

            {/* Display review | right side */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Preview
                </Typography>
                <VocaCard voca={ vocaStore.previewVoca } />
            </Grid>
        </Grid>
    </React.Fragment>)
}