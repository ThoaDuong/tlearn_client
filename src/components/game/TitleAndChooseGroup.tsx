import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../stores/store"
import Group from "../../interfaces/Group.ts";

type TitleAndChooseGroupProps = {
    title: string,
    groupName: string,
    setGroupName: (value: string) => void
}

export const TitleAndChooseGroup = ({ title, groupName, setGroupName }: TitleAndChooseGroupProps) => {

    // redux
    const groupStore = useSelector((state: RootState) => state.group);

    // function
    const handleChangeGroup = (event: any) => {
        // pass this action out to the parent
        setGroupName(event.target.value);
    }

    return (<React.Fragment>
        {/* Display title */}
        <Typography sx={{ pb: 1, flexGrow: 1, fontWeight: 'semibold' }} variant="h5">
            {title}
        </Typography>


        {/* Display group name title */}
        <Typography sx={{ fontWeight: 'semibold', py: 1 }} variant="body1">
            Choose a group for vocabulary focus:
        </Typography>


        {/* Field: group name */}
        <FormControl size="small" sx={{ width: '100%' }}>
            <InputLabel id="groupInput">Group</InputLabel>
            <Select id="groupSelect" labelId="groupInput" label="Group"
                value={groupName}
                onChange={handleChangeGroup}
            >
                <MenuItem aria-label="None" value="All">
                    <Typography>All</Typography>
                </MenuItem>

                {groupStore.listGroup.map((item: { group: Group, totalVoca: number }) => (
                    <MenuItem key={item.group.id} value={item.group.groupName}>
                        <Typography>
                            {item.group.groupName}
                        </Typography>

                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </React.Fragment>)
}