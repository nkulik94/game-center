import React from "react";
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ButtonGroup from '@mui/material/ButtonGroup';

function GameCardActions({ game }) {
    return (
        <CardActions>
            <ButtonGroup variant="string" fullWidth>
                <Button startIcon={<FavoriteBorderIcon sx={{color: 'red'}} />} >
                    5
                </Button>
                <Button startIcon={<StarOutlineIcon sx={{color: 'yellow'}} />} >
                    4.7
                </Button>
                <Button startIcon={<ChatBubbleOutlineIcon />} >
                    5
                </Button>
                <Button sx={{color: '#1e88e5'}} component={Link} to={`/game-list/${game.id}`} >
                    More
                </Button>
            </ButtonGroup>
        </CardActions>
    )
}

export default GameCardActions