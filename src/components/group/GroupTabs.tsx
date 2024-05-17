import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react"
import { VocaState } from "../../stores/slices/vocaSlice";
import { groupState } from "../../stores/slices/groupSlice";

type GroupTabsProps = {
    changeGroupName: (groupName: string) => void,
    vocaStore: VocaState,
    groupStore: groupState
}

export const GroupTabs = (props: GroupTabsProps) => {

    // variable
    const [groupTab, setGroupTab] = useState(0);
    const [vocaAmount, setVocaAmount] = useState<any>({'all': 0});

    // watch
    useEffect(() => {
        const tempVocas = props.vocaStore.listVoca;
        const tempGroups = props.groupStore.listGroup;
        let tempAmount: any = {
            'all': tempVocas.length
        };

        tempGroups.forEach((group) => {
            const filter = tempVocas.filter(voca => voca.groupName === group.groupName);
            tempAmount[group.groupName] = filter.length;
        })

        setVocaAmount(tempAmount);
        
    }, [props.vocaStore.listVoca, props.groupStore.listGroup])

    // function
    const handleChangeGroupTab = (event: any, newValue: number) => {
        const groupName = event.target.innerText;
        props.changeGroupName(groupName);
        setGroupTab(newValue);
    }

    return (<React.Fragment>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
            value={groupTab}
            onChange={handleChangeGroupTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            >
                <Tab sx={{ textTransform: 'none' }}  label={
                    <Box sx={{display: 'flex', gap: 1}}>
                        <span>All</span>
                        <span style={{ 
                            fontSize: "10px", 
                            borderRadius: '50%', 
                            backgroundColor: '#75A47F', 
                            color: 'white', 
                            padding: '3px 4px' 
                        }}> {vocaAmount['all']} </span>
                    </Box>
                } />
                { props.groupStore.listGroup.map(group => (
                    <Tab sx={{ textTransform: 'none' }} key={group.id} label={
                        <Box sx={{display: 'flex', gap: 1}}>
                            <span> {group.groupName} </span>
                            <span style={{ 
                                fontSize: "10px", 
                                borderRadius: '50%', 
                                backgroundColor: '#75A47F', 
                                color: 'white', 
                                padding: '3px 4px' 
                            }}> {vocaAmount[group.groupName]} </span>
                        </Box>
                    }/>
                )) }
            </Tabs>
        </Box>
    </React.Fragment>)
}