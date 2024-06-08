import { Pagination, Stack } from "@mui/material"
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"

type PaginationListProps = {
    arrayFullItems: any[],
    itemPerPage: number,
    itemPaginationFromParent: any[],
    setItemPaginationFromParent: (array: any[]) => void
}
export type PaginationListRefType = {
    setCurrentPageToDefault: () => void,
}


export const PaginationList = forwardRef<PaginationListRefType, PaginationListProps>(({ arrayFullItems, itemPerPage, itemPaginationFromParent, setItemPaginationFromParent}, ref) => {

    // variable
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPaginationList, setItemPaginationList] = useState<any[][]>([]);

    // watch
    // watch list arrayFullItems
    useEffect(() => {
        let tempList = [ ...arrayFullItems ];
        if (tempList.length > 0){
            let items = [];
            while (tempList.length > 0) {
                items.push(tempList.splice(0, itemPerPage));
            }
            setItemPaginationList(items);
            setItemPaginationFromParent(items[currentPage-1] || []);
        }
    }, [arrayFullItems])



    // function
    useImperativeHandle(ref, () => ({

        setCurrentPageToDefault(): any {
            setCurrentPage(1);
        }
    
    }));

    const handleChangePagination = (event: any, value: number) => {
        if (event) {
            setCurrentPage(value);
        }
        // [value -1]: arrayFullItems start with 0
        setItemPaginationFromParent(itemPaginationList[value - 1] || [])
    }


    return (<React.Fragment>
        
        {/* position fix at bottom for equal or less than 4 items */}
        {  itemPaginationFromParent.length > 0 && itemPaginationFromParent.length <= 4 && <Stack spacing={2} sx={{ 
            position: 'fixed',
            bottom: 70,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            zIndex: 99,
        }}>
            <Pagination 
                count={itemPaginationList.length} 
                page={currentPage}
                onChange={handleChangePagination}
                color="primary" />
        </Stack>}

        {/* Display position under item card for more than 4 items */}
        { itemPaginationFromParent.length > 4 && <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Pagination 
                count={itemPaginationList.length} 
                page={currentPage}
                onChange={handleChangePagination}
                color="primary" />
        </Stack>}
        
    </React.Fragment>)
})