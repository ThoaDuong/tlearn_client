import { Pagination, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import {useDispatch} from 'react-redux'
import { AppDispatch } from "../stores/store.ts";
import { fetchVocaListByPage, setCurrentPage } from "../stores/slices/vocaSlice.ts";
import Group from "../interfaces/Group.ts";

type PaginationListProps = {
    itemPerPage: number,
    currentPage: number,
    total: number,
    userID: string,
    activeGroupTab?: Group|null,
    keyword: string
}


export const PaginationList = ({ itemPerPage, currentPage, total, userID, activeGroupTab, keyword}: PaginationListProps) => {

    // variable
    // const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState<number>(0);

    // redux
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(total && itemPerPage){
            setCount(Math.ceil(total/itemPerPage));
        }
    }, [total, itemPerPage, currentPage, activeGroupTab]);



    // function

    const handleChangePagination = (event: any, value: number) => {
        if (event) {
            const queries: { userID: string, page: number, limit: number, keyword?: string, groupID?: string } = {
                userID: userID,
                page:value,
                limit: itemPerPage,
                keyword: keyword
            }
            if(activeGroupTab){
                queries.groupID = activeGroupTab.id;
            }
            dispatch(fetchVocaListByPage(queries))
            dispatch(setCurrentPage(value));
        }
    }


    return (<>
        
        {/* position fix at bottom for equal or less than 4 items */}
        {  total > 0 && total <= 4 && <Stack spacing={2} sx={{
            position: 'fixed',
            bottom: 70,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            zIndex: 99,
        }}>
            <Pagination
	            count={count}
                page={currentPage}
                onChange={handleChangePagination}
                color="primary" />
        </Stack>}

        {/* Display position under item card for more than 4 items */}
        { total > 4 && <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Pagination
                count={count}
                page={currentPage}
                onChange={handleChangePagination}
                color="primary" />
        </Stack>}
        
    </>)
}