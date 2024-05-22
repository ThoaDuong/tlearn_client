import { Box, Pagination, Stack } from "@mui/material"
import React from "react"

type PaginationListProps = {
    count: number,
    page: number,
    onChange: (event: any, value: number) => void,
    lengthOfList: number,
}

export const PaginationList = ({count, page, onChange, lengthOfList}: PaginationListProps) => {
    return <React.Fragment>
        
        {/* position fix at bottom for equal or less than 4 vocabularies */}
        { lengthOfList <= 4 && <Stack spacing={2} sx={{ 
            position: 'fixed',
            bottom: 70,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            zIndex: 99,
        }}>
            <Pagination 
                count={count} 
                page={page}
                onChange={onChange}
                color="primary" />
        </Stack>}

        {/* Display position under voca card for more than 4 vocabularies */}
        { lengthOfList > 4 && <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Pagination 
                count={count} 
                page={page}
                onChange={onChange}
                color="primary" />
        </Stack>}
        
    </React.Fragment>
}