import React from "react";
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

function PageButtons({ pageCount, currentPage }) {


    return (
        <Stack spacing={2} sx={{padding: 3}} >
            <Pagination
            count={pageCount}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            renderItem={item => (
                <PaginationItem component={Link} to={`/game-list/pages/${item.page}`} {...item} />
            )}
            />
        </Stack>
    )
}

export default PageButtons