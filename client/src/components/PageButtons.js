import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PageButtons({ pageCount, setPage }) {

    function handleChange(page) {
        const start = (page - 1) * 18
        const end = start + 18
        setPage({
            start,
            end
        })
    }
    return (
        <Stack spacing={2} sx={{padding: 3}} >
            <Pagination count={pageCount} variant="outlined" shape="rounded" onChange={(_, page) => handleChange(page)} />
        </Stack>
    )
}

export default PageButtons