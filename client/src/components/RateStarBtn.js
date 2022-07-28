import React from "react";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import IconButton from '@mui/material/IconButton';

function RateStarBtn({ filled, index, handleRating }) {
    return (
        <IconButton>
            {filled ? <StarRateIcon onClick={() => handleRating(index)} sx={{color: 'yellow'}} /> : <StarOutlineIcon onClick={() => handleRating(index)} sx={{color: 'yellow'}} />}
        </IconButton>
    )
}

export default RateStarBtn