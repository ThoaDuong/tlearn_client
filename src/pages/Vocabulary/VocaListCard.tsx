import { Box, Button, Grid, IconButton, InputBase, Paper, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { VocaCard } from "./VocaCard"
import { Add, Search } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../stores/store"
import { fetchVocaListByUserID, setIsDeleteVocaSuccess } from "../../stores/slices/vocaSlice"
import { RedirectToLoginPage } from "../RedirectToLoginPage"
import Vocabulary from "../../interfaces/Vocabulary"


export const VocaListCard = () => {
    // variable
    const [searchKeyword, setSearchKeyword] = useState("");
    const [listVocaSearch, setListVocaSearch] = useState<Vocabulary[]>([]);

    // redux
    const vocaStore = useSelector((state: RootState) => state.vocabulary);
    const userStore = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();

    // watcch isDeleteVocaSuccess change
    useEffect(() => {
        if(vocaStore.isDeleteVocaSuccess){
            dispatch(fetchVocaListByUserID(userStore.id));
            dispatch(setIsDeleteVocaSuccess(false));
        }
    }, [vocaStore.isDeleteVocaSuccess])

    // watch searchKeyword and listVoca change
    useEffect(() => {
        const list = vocaStore.listVoca.filter(voca => voca.word.includes(searchKeyword));
        setListVocaSearch(list);

    }, [searchKeyword, vocaStore.listVoca])

    // watch userStore change
    useEffect(() => {
        if(userStore.id){
            dispatch(fetchVocaListByUserID(userStore.id));
        }
    }, [userStore]);

    return (<React.Fragment>
        <Box sx={{ display: 'flex' }}>
            {/* Display title */}
            <Typography sx={{ py:2, flexGrow: 1 }} variant="h5">
                Vocabulary
            </Typography>

            {/* Display search vocabulary | laptop */}
            <Toolbar sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <Paper>
                    <InputBase sx={{ ml: 2, width: {md: 250, lg: 350}}} placeholder="Search vocabulary"
                        value={searchKeyword}
                        onChange={(event) => setSearchKeyword(event.target.value)}
                    />
                    <IconButton type="button">
                        <Search />
                    </IconButton>
                </Paper>
            </Toolbar>

            {/* Display button add new vocabulary */}
            <Toolbar disableGutters sx={{ flexGrow: 0 }}>
                <RouterLink to={userStore.id ? "new-voca" : "/"}>
                    <Button startIcon={<Add/>} variant="contained">
                        Add new
                    </Button>
                </RouterLink>
            </Toolbar>
        </Box>

        {/* Display search vocabulary | mobile */}
        <Toolbar disableGutters sx={{ display: {xs: 'block', md: 'none'}}}>
            <Paper sx={{ display: 'flex' }}>
                <InputBase sx={{ ml: 2, width: '100%'}} placeholder="Search vocabulary"/>
                <IconButton type="button">
                    <Search />
                </IconButton>
            </Paper>
        </Toolbar>

        {/* Display list vocabularies */}
        { userStore.id ?
            <Grid container spacing={2}>
                { listVocaSearch.map(voca => 
                    <Grid key={voca.id} item xs={12} sm={6} md={4} lg={3}>
                        <VocaCard  voca={voca}/>
                    </Grid>
                ) }
            </Grid>
            :
            <RedirectToLoginPage/>
        }
    </React.Fragment>)
}