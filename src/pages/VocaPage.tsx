import { Box, Button, IconButton, InputBase, Pagination, Paper, Stack, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { Add, Search } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../stores/store"
import { fetchVocaListByUserID, setIsDeleteVocaSuccess } from "../stores/slices/vocaSlice"
import Vocabulary from "../interfaces/Vocabulary"
import { VocaListCard } from "../components/vocabulary/VocaListCard"
import { GroupTabs } from "../components/group/GroupTabs"
import { fetchGroupsByUserID } from "../stores/slices/groupSlice"


export const VocaPage = () => {
    // variable
    const [searchKeyword, setSearchKeyword] = useState("");
    const [listVocaSearch, setListVocaSearch] = useState<Vocabulary[]>([]);
    const [activeGroupTab, setActiveGroupTab] = useState("All");
    const groupTabAll = useRef('All');

    // variable pagination
    const [currentPage, setCurrentPage] = useState(1);
    // const [vocaPerPage, setVocaPerPage] = useState(12);

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

    // watch searchKeyword, activeGroupTab and listVoca change
    useEffect(() => {
        // filter list display vocabularies
        const list = vocaStore.listVoca.filter((voca) => {
            // active group: All
            if(activeGroupTab === groupTabAll.current){
                return voca.word.includes(searchKeyword) ? true : false;
            }
            // active group: custom group name
            else{
                return !!(voca.word.includes(searchKeyword) && voca.groupName === activeGroupTab) ? true : false;
            }
        });
        setListVocaSearch(list);

    }, [searchKeyword, vocaStore.listVoca, activeGroupTab]);

    // watch listVocaSearch | still working on this
    useEffect(() => {
        let tempList = [ ...listVocaSearch ];
        if (tempList.length > 0){
            // while (tempList.length > 0) {
            //     console.log('test', tempList.splice(0, vocaPerPage));
            // }
        }

    }, [listVocaSearch])

    // watch userStore change
    useEffect(() => {
        if(userStore.id){
            // fetch list voca and groups
            dispatch(fetchVocaListByUserID(userStore.id));
            dispatch(fetchGroupsByUserID(userStore.id));
        }
    }, [userStore]);

    // function

    // trigger in child component: GroupTabs
    const handleChangeGroupName = (groupName: string) => {
        setActiveGroupTab(groupName);
    }

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
        <GroupTabs changeGroupName={handleChangeGroupName} />
        

        {/* Display list voca */}
        <VocaListCard listFilterVoca={listVocaSearch} />


        {/* Display pagiantion for list voca */}
        <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Pagination 
                count={6} 
                page={currentPage}
                onChange={(event, value) => {event && setCurrentPage(value)}}
                variant="outlined" 
                color="primary" />
        </Stack>
    </React.Fragment>)
}