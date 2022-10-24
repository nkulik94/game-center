import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PageButtons({ count, setPage, page={page} }) {
    return (
        <Stack spacing={2} sx={{padding: 3}} >
            <Pagination
            count={count}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={(_, page) => setPage(page)}
            />
        </Stack>
    )
}

export default PageButtons