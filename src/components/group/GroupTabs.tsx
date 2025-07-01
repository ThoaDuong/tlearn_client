import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState, useMemo } from "react"
import {fetchVocaListByPage, setCurrentPage, VocaState} from "../../stores/slices/vocaSlice";
import {groupState, setActiveGroupTab} from "../../stores/slices/groupSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../stores/store.ts";
import Group from "../../interfaces/Group.ts"

type GroupTabsProps = {
    vocaStore: VocaState,
    groupStore: groupState,
    userID: string,
}

export const GroupTabs = ({ vocaStore, groupStore, userID }: GroupTabsProps) => {

    // variable
    const [groupTab, setGroupTab] = useState(0);
    const totalVocaAll = useMemo(() => {
        return groupStore.listGroup.reduce((total, current) => total + current.totalVoca, 0);
    }, [groupStore.listGroup])

    // redux
    const dispatch: AppDispatch = useDispatch();

    // function
    const handleChangeGroupTab = (event: any, newValue: number) => {
        if(event){
            setGroupTab(newValue);
        }
    }

    const handleClickTab = (group: Group|null) => {
        const body: { userID: string, page: number, limit: number, groupID?: string, keyword?: string } = {
            userID: userID,
            page: 1,
            limit: 12,
            keyword: vocaStore.keyword
        }
        if(group){
            body.groupID = group.id;
        }
        dispatch(fetchVocaListByPage(body));
        dispatch(setCurrentPage(1));
        dispatch(setActiveGroupTab(group))
    }

    return (<>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
            value={groupTab}
            onChange={handleChangeGroupTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            >
                <Tab sx={{ textTransform: 'none' }}
                     onClick={() => handleClickTab(null)}
                     label={
                    <Box sx={{display: 'flex', gap: 1}}>
                        <Typography component="span">All</Typography>
                        <Typography component="span" sx={{ 
                            fontSize: "10px", 
                            borderRadius: '20px', 
                            backgroundColor: 'var(--pink)',
                            border: '1px solid var(--black)',
                            color: 'white', 
                            padding: '5px 8px' 
                        }}> {totalVocaAll} </Typography>
                    </Box>
                } />
                { groupStore.listGroup.map(data => (
                    <Tab sx={{ textTransform: 'none' }}
                         onClick={() => handleClickTab(data.group)}
                         key={data.group.id} label={
                        <Box sx={{display: 'flex', gap: 1}}>
                            <Typography component="span"> {data.group.groupName} </Typography>
                            <Typography component="span" sx={{ 
                                fontSize: "10px", 
                                borderRadius: '20px', 
                                backgroundColor: 'var(--pink)', 
                                border: '1px solid var(--black)',
                                color: 'white', 
                                padding: '3px 8px' 
                            }}> {data.totalVoca} </Typography>
                        </Box>
                    }/>
                )) }
            </Tabs>
        </Box>
    </>)
}