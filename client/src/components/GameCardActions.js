import React from "react";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function GameCardActions() {
    return (
        <CardActions>
            <Button startIcon={<FavoriteBorderIcon sx={{color: 'red'}} />} >
                5
            </Button>
        </CardActions>
    )
}

export default GameCardActions