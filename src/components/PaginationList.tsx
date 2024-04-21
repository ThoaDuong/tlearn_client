import { Pagination, Stack } from "@mui/material"
import React from "react"

type PaginationListProps = {
    count: number,
    page: number,
    onChange: (event: any, value: number) => void
}

export const PaginationList = ({count, page, onChange}: PaginationListProps) => {
    return <React.Fragment>
        <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Pagination 
                count={count} 
                page={page}
                onChange={onChange}
                variant="outlined" 
                color="primary" />
        </Stack>
    </React.Fragment>
}