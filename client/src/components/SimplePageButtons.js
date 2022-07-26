import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function SimplePageButtons({ setList, games, count }) {
    function handleChange(start) {
        const end = start + 18
        setList(games.slice(start, end))
    }

    return (
        <Stack spacing={2} sx={{padding: 3}} >
            <Pagination
            count={count}
            variant="outlined"
            shape="rounded"
            onChange={(_, page) => handleChange((page - 1) * 18)}
            />
        </Stack>
    )
}

export default SimplePageButtons