import { Box, Button, Grid, IconButton, InputBase, Paper, Stack, Toolbar, Typography } from "@mui/material"
import { useEffect, useState, Suspense, lazy } from "react"
import { Add, Search } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../stores/store"
import {
    fetchVocaListByPage,
    fetchVocaListByUserID,
    setKeyword,
    setIsDeleteVocaSuccess,
    setCurrentPage
} from "../stores/slices/vocaSlice"
import Vocabulary from "../interfaces/Vocabulary"
import { GroupTabs } from "../components/group/GroupTabs"
import {fetchGroupsByUserID, setActiveGroupTab} from "../stores/slices/groupSlice"
import { PaginationList } from "../components/PaginationList"
import VocaCardSkeleton from "../components/vocabulary/VocaCardSkeleton.tsx";
import useDebounce from "../utils/UseDebounce.tsx"

// component
const VocaCard = lazy(() => import("../components/vocabulary/VocaCard"));


export const VocaPage = () => {
    // variable
    const [searchKeyword, setSearchKeyword] = useState("");
    const debouncedSearch: string = useDebounce({value: searchKeyword, delayTime: 400});

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

    useEffect(() => {
        dispatch(setKeyword(debouncedSearch));
        dispatch(fetchVocaListByPage({
            userID: userStore.id,
            page:1,
            limit: 12,
            groupID: groupStore.activeGroupTab?.id,
            keyword: debouncedSearch || ""
        }))
    }, [debouncedSearch]);

    // watch userStore change
    useEffect(() => {
        if(userStore.id){
            dispatch(fetchGroupsByUserID(userStore.id));
            dispatch(fetchVocaListByPage({
                userID: userStore.id,
                page:1,
                limit: 12,
                groupID: undefined,
                keyword: "",
            }))
        }

        // clear value before unmount
        return () => {
            dispatch(setActiveGroupTab(null));
            dispatch(setCurrentPage(1));
        }
    }, [userStore]);


    return (<>
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
                <Button variant="outlined" component={RouterLink} to={userStore.id ? "new" : "/"}
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
            groupStore={groupStore}
            vocaStore={vocaStore}
            userID={userStore.id}
        />

        {/* Check loading voca list */}
        <Suspense fallback={
            <Grid container spacing={2}>
                { Array(8).fill(null).map((_, index) =>
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                        <VocaCardSkeleton />
                    </Grid>
                ) }
            </Grid>
        }>
            <Grid container spacing={2}>
                {vocaStore.listVocaByPage.length > 0 ?
                    // Display voca list
                    vocaStore.listVocaByPage.map((voca: Vocabulary) =>
                        <Grid key={voca.id} item xs={12} sm={6} md={4} lg={3}>
                            <VocaCard  voca={voca}/>
                        </Grid>
                    )
                    :
                    // Display empty message when have no vocabulary
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: 1, height: '50vh' }}
                    >
                        <Typography>You have no vocabulary. Let's create some to start your journey!</Typography>
                    </Stack>
                }
            </Grid>
        </Suspense>


        {/* Display pagination for list voca */}
        <PaginationList
            itemPerPage={vocaStore.itemPerPage}
            currentPage={vocaStore.currentPage}
            total={vocaStore.totalVoca}
            userID={userStore.id}
            activeGroupTab={groupStore.activeGroupTab}
            keyword={vocaStore.keyword}
        />
    </>)
}