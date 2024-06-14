import { Box, Button, Grid, IconButton, InputBase, Paper, Stack, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { Add, Search } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../stores/store"
import { fetchVocaListByUserID, setIsDeleteVocaSuccess } from "../stores/slices/vocaSlice"
import Vocabulary from "../interfaces/Vocabulary"
import { GroupTabs } from "../components/group/GroupTabs"
import { fetchGroupsByUserID } from "../stores/slices/groupSlice"
import { PaginationList, PaginationListRefType } from "../components/PaginationList"
import { VocaCard } from "../components/vocabulary/VocaCard"


export const VocaPage = () => {
    // variable
    const [searchKeyword, setSearchKeyword] = useState("");
    const [listVocaSearch, setListVocaSearch] = useState<Vocabulary[]>([]);
    const [activeGroupTab, setActiveGroupTab] = useState("All");
    const groupTabAll = useRef('All');

    // variable pagination
    const [vocaPagination, setVocaPagination] = useState<any>([]);
    const paginationListChildRef = useRef<PaginationListRefType>(null);

    // redux
    const vocaStore = useSelector((state: RootState) => state.vocabulary);
    const userStore = useSelector((state: RootState) => state.user);
    const groupStore = useSelector((state: RootState) => state.group);
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
            if (activeGroupTab === groupTabAll.current) {
                return voca.word.toLowerCase().includes(searchKeyword.toLowerCase()) ? true : false;
            }
            // active group: custom group name
            else {
                return !!(voca.word.toLowerCase().includes(searchKeyword.toLowerCase()) && voca.groupName === activeGroupTab) ? true : false;
            }
        });
        setListVocaSearch(list);

    }, [searchKeyword, vocaStore.listVoca, activeGroupTab]);

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

        // trigger function in child: PaginationList
        paginationListChildRef.current?.setCurrentPageToDefault();
    }


    return (<React.Fragment>
        <Box sx={{ display: 'flex' }}>
            {/* Display title */}
            <Typography sx={{ py: 2, flexGrow: 1, color: 'var(--black)' }} variant="h5">
                Vocabulary
            </Typography>

            {/* Display search vocabulary | laptop */}
            <Toolbar sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Paper sx={{ borderRadius: '40px', px: 2 }}>
                    <InputBase sx={{ ml: 2, width: { md: 250, lg: 350 },  }} placeholder="Search vocabulary"
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
                    startIcon={<Add />}
                    sx={{ 
                        borderRadius: "30px", 
                        px: 4,
                        bgcolor: 'var(--yellow)',
                        color: 'var(--black)',
                        border: '1px solid var(--black)',
                        fontWeight: '600'
                    }}>
                    Add new
                </Button>
            </Toolbar>
        </Box>

        {/* Display search vocabulary | mobile */}
        <Toolbar disableGutters sx={{ display: { xs: 'block', md: 'none' } }}>
            <Paper sx={{ display: 'flex',  borderRadius: '40px', px: 2 }}>
                <InputBase sx={{ ml: 2, width: '100%' }} placeholder="Search vocabulary"
                    value={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.target.value)}
                />
                <IconButton type="button">
                    <Search />
                </IconButton>
            </Paper>
        </Toolbar>

        {/* Display list group */}
        <GroupTabs 
            changeGroupName={handleChangeGroupName} 
            groupStore={groupStore} 
            vocaStore={vocaStore} 
        />

        {/* Display empty message when have no vocabulary */}
        {vocaPagination.length <= 0 && <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: '50vh' }}
        >
            <Typography>You have no vocabulary. Let's create some to start your journey!</Typography>
        </Stack>}


        {/* Display list voca */}
        <Grid container spacing={2}>
            { vocaPagination.map((voca: Vocabulary) => 
                <Grid key={voca.id} item xs={12} sm={6} md={4} lg={3}>
                    <VocaCard  voca={voca}/>
                </Grid>
            ) }
        </Grid>


        {/* Display pagiantion for list voca */}
        <PaginationList 
            ref={paginationListChildRef}
            arrayFullItems={listVocaSearch}
            itemPerPage={12}
            itemPaginationFromParent={vocaPagination}
            setItemPaginationFromParent={setVocaPagination}
        />
    </React.Fragment>)
}