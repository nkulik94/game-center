import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BioEdit from "./BioEdit";

function Bio({ bio, id }) {
    const [bioState, setBio] = useState(bio)
    return (
        <Box>
            <Typography variant="h6">Bio:</Typography>
            <Typography variant='body'>
                {bioState}
            </Typography>
            <br/>
            <BioEdit bio={bioState} setBio={setBio} id={id}/>
        </Box>
    )
}

export default Bio