import { Add, Search } from "@mui/icons-material"
import { Box, Button, Grid, IconButton, InputBase, Paper, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { AppDispatch, RootState } from "../stores/store"
import { WritingCard } from "../components/writing/WritingCard"
import { fetchWritingListByUserID, setIsDeleteWritingSuccess } from "../stores/slices/writingSlice"
import { Writing } from "../interfaces/Writing"

export const WritingPage = () => {

    // variable
    const [searchKeyword, setSearchKeyword] = useState("");
    const [writingListSearch, setWritingListSearch] = useState<Writing[]>([]);

    // redux
    const userStore = useSelector((state: RootState) => state.user);
    const writingStore = useSelector((state: RootState) => state.writing);
    const dispatch: AppDispatch = useDispatch();

    // WATCH

    // watch user change
    useEffect(() => {
        if(userStore.id){
            dispatch(fetchWritingListByUserID(userStore.id));
        }
    }, [userStore.id])

    // watch writing list
    useEffect(() => {
        const list = writingStore.listWriting.filter((item: Writing) => 
            (item.title.includes(searchKeyword) || item.content.includes(searchKeyword))
        );
        setWritingListSearch(list);
    }, [searchKeyword, writingStore.listWriting])

    // watch delete writing
    useEffect(() => {
        if(writingStore.isDeleteWritingSuccess){
            dispatch(setIsDeleteWritingSuccess(false));
            dispatch(fetchWritingListByUserID(userStore.id));
        }
    }, [writingStore.isDeleteWritingSuccess]) 

    return (<React.Fragment>
        <Box sx={{ display: 'flex', mb: 3 }}>
            {/* Display title */}
            <Typography sx={{ py: 2, flexGrow: 1 }} variant="h5">
                Writing
            </Typography>

            {/* Display search writing | laptop */}
            <Toolbar sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Paper>
                    <InputBase sx={{ ml: 2, width: { md: 250, lg: 350 } }} placeholder="Search writing"
                        value={searchKeyword}
                        onChange={(event) => setSearchKeyword(event.target.value)}
                    />
                    <IconButton type="button">
                        <Search />
                    </IconButton>
                </Paper>
            </Toolbar>

            {/* Display button add new writing */}
            <Toolbar disableGutters sx={{ flexGrow: 0 }}>
                <Button variant="outlined" component={RouterLink} to={userStore.id ? "new" : "/"}
                    startIcon={<Add />}
                    sx={{ borderRadius: "30px", px: 4 }}>
                    Add new
                </Button>
            </Toolbar>
        </Box>


        {/* Display list writing */}
        <Grid key="container" container spacing={2}>
            { writingListSearch.map((writingItem: Writing) => (
                <Grid key={writingItem.id} item xs={12} sm={6} md={4} lg={3}>
                    <WritingCard writingItem={writingItem}/>
                </Grid>
            )) }
        </Grid>
    </React.Fragment>)
}