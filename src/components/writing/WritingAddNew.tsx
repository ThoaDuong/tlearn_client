import { Add, Cancel, Save } from "@mui/icons-material";
import { Box, Button, CircularProgress, FormControl, Grid, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import { addNewWriting, setEditWritingObject, setIsAddNewWritingSuccess, setIsUpdateWritingSuccess, updateWriting } from "../../stores/slices/writingSlice";
import { useNavigate } from "react-router-dom";
import { alertAddNewSuccess } from "../../utils/SweetAlert";

export const WritingAddNew = () => {

    // variable
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [errorObject, setErrorObject] = useState({
        titleMessage: "",
        contentMessage: ""
    })

    // redux
    const userStore = useSelector((state: RootState) => state.user);
    const writingStore = useSelector((state: RootState) => state.writing);
    const dispatch: AppDispatch = useDispatch();

    // WATCH
    // watch add new success
    useEffect(() => {
        if(writingStore.isAddNewWritingSuccess){
            alertAddNewSuccess(title);
            clearWritingField();
            dispatch(setIsAddNewWritingSuccess(false));
            navigate(-1);

        }
    }, [writingStore.isAddNewWritingSuccess])

    // watch update success
    useEffect(() => {
        if(writingStore.isUpdateWritingSuccess){
            clearWritingField();
            dispatch(setIsUpdateWritingSuccess(false));
            navigate(-1);
        }
    }, [writingStore.isUpdateWritingSuccess])

    // watch edit object
    useEffect(() => {
        if(writingStore.editWritingObject){
            setTitle(writingStore.editWritingObject.title);
            setContent(writingStore.editWritingObject.content);
        }
    }, [writingStore.editWritingObject])


    // function

    const clearWritingField = () => {
        setTitle("");
        setContent("");
    }

    // check validate writing
    const checkValidateWriting = () => {
        if(!title){
            setErrorObject({
                ...errorObject,
                titleMessage: "The title field cannot be empty.",
            });
            return false;
        }
        if(!content){
            setErrorObject({
                ...errorObject,
                titleMessage: "",
                contentMessage: "The content field cannot be empty.",
            });
            return false;
        }
        

        // validate | true
        setErrorObject({
            titleMessage: "",
            contentMessage: ""
        })
        return true;
    }

    // add new writing item
    const handleAddNewWriting = (event: any) => {
        event.preventDefault();

        const isValid = checkValidateWriting();
        if(isValid){
            dispatch(addNewWriting({
                title,
                content,
                userID: userStore.id
            }))
        }
    }

    // update writing item
    const handleUpdateWriting = (event: any) => {
        event.preventDefault();

        const isValid = checkValidateWriting();
        if(isValid){
            const writingObj = {
                ...writingStore.editWritingObject,
                title: title,
                content: content
            }
            dispatch(updateWriting(writingObj));
        }
    }
    
    const handleGoBack = () => {
        clearWritingField();
        dispatch(setEditWritingObject(null));
        navigate(-1);
    }
    
    return (<React.Fragment>
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>

                {/* Display voca title */}
                <Typography variant="h6" sx={{ my: 2 }}>
                    Add new writing
                </Typography>

                {/* Display writing field */}
                <Box component="form" onSubmit={ writingStore.editWritingObject ? handleUpdateWriting : handleAddNewWriting}>

                     {/* Field: title */}
                     <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField variant="outlined" id="new" label="New word" 
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        {/* Display content error */}
                        <Typography color="error"> {errorObject.titleMessage} </Typography>
                    </FormControl>

                     {/* Field: context */}
                    <FormControl fullWidth>
                        <TextField variant="outlined" id="writing" label="Writing" multiline rows={12} 
                            value={content}
                            onChange={(event) => setContent(event.target.value) }
                        />
                        {/* Display content error */}
                        <Typography color="error"> {errorObject.contentMessage} </Typography>
                    </FormControl>


                    {/* Display submit button */}
                    <Box sx={{ display: 'flex', mt: 2 }}>

                        {/* Display button */}
                        <Button type="button" startIcon={<Cancel />} variant="contained" color="error"
                            sx={{ borderRadius: "30px", px: 3 }}
                            onClick={handleGoBack}>
                            Go Back
                        </Button>

                        { !writingStore.editWritingObject ?
                        <Button type="submit" startIcon={<Add />} variant="contained" 
                            sx={{ ml:1,borderRadius: "30px", px: 3 }}>
                            Add
                        </Button>
                        :
                        <Button type="submit" startIcon={<Save />} variant="contained" 
                            sx={{ ml:1, borderRadius: "30px", px: 3 }}>
                            Save
                        </Button> }

                        {/* Display loading */}
                        { writingStore.isLoading && <CircularProgress sx={{ ml:1 }} />}
                    </Box>
                </Box>

            </Grid>


            {/* Display review */}
            {/* <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Preview
                </Typography>

                <Typography variant="h6">
                    {title}
                </Typography>

                <Box sx={{ }}>
                    <ReactMarkdown children={writingText} />
                </Box>
            </Grid> */}
        </Grid>
    </React.Fragment>)
}