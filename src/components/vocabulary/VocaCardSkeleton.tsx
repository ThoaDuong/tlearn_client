import {  Skeleton, Stack } from '@mui/material';

export const VocaCardSkeleton = () => {
    return <Stack sx={{ width: "100%", padding: '10px 0' }} spacing={1}>
        <Skeleton variant="text" width={100} height={30} />
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={100} height={30} />
        <Skeleton variant="rounded" width="100%" height={80} />
        <Skeleton variant="rounded" width="100%" height={40} />
    </Stack>
}

export default VocaCardSkeleton;