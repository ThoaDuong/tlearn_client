import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

export const GroupTabs = (props: any) => {

    // variable
    const [groupTab, setGroupTab] = useState(0);

    // redux
    const groupStore = useSelector((state: RootState) => state.group);

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
                <Tab sx={{ textTransform: 'none' }}  label="All" />
                { groupStore.listGroup.map(group => (
                    <Tab sx={{ textTransform: 'none' }} key={group.id} label={group.groupName} />
                )) }
            </Tabs>
        </Box>
    </React.Fragment>)
}