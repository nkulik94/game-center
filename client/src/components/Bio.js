import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BioEdit from "./BioEdit";

function Bio({ bio, id }) {
    return (
        <Box>
            <Typography variant="h6">Bio:</Typography>
            <Typography variant='body'>
                {bio}
            </Typography>
            <br/>
            <BioEdit bio={bio} />
        </Box>
    )
}

export default Bio