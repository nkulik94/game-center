import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Bio({ bio }) {
    return (
        <Box>
            <Typography variant="h6">Bio:</Typography>
            <Typography variant='body'>
                {bio}
            </Typography>
            <br/>
            <Button variant='text' >Change</Button>
        </Box>
    )
}

export default Bio