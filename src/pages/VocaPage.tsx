import { Box, Button, IconButton, InputBase, Paper, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Add, Search } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../stores/store"
import { fetchVocaListByUserID, setIsDeleteVocaSuccess } from "../stores/slices/vocaSlice"
import Vocabulary from "../interfaces/Vocabulary"
import { VocaListCard } from "../components/vocabulary/VocaListCard"
import { GroupTabs } from "../components/group/GroupTabs"


export const VocaPage = () => {
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
                <Button variant="outlined" component={RouterLink} to={userStore.id ? "new-voca" : "/"}
                startIcon={<Add/>}
                sx={{ borderRadius: "30px", px: 4 }}>
                    Add new
                </Button>
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

        {/* Display list group */}
        <GroupTabs />
        

        {/* Display list voca */}
        <VocaListCard listFilterVoca={listVocaSearch} />
    </React.Fragment>)
}