import React, { useState } from "react";
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ButtonGroup from '@mui/material/ButtonGroup';
import ErrorMsg from "./ErrorMsg";

function GameCardActions({ game, gameObj }) {
    const [error, setError] = useState('')

    function handleError(error) {
        setError(error)
        setTimeout(() => setError(''), 3000)
    }

    function handleLikes() {
        const config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({likes: 1})
        }
        fetch(`/games/${game.id}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(game => {
                        gameObj.setList(gameObj.listedGames.map(g => g.id === game.id ? game : g))
                    })
                } else {
                    r.json().then(({ error }) => handleError(error))
                }
            })
    }

    return (
        <>
        {error ? <ErrorMsg error={error} /> : null}
        <CardActions>
            <ButtonGroup variant="string" fullWidth>
                <Button startIcon={<FavoriteBorderIcon sx={{color: 'red'}} onClick={handleLikes} />} >
                    {game.likes}
                </Button>
                <Button startIcon={<StarOutlineIcon sx={{color: 'yellow'}} />} >
                    4.7
                </Button>
                <Button startIcon={<ChatBubbleOutlineIcon />} >
                    10
                </Button>
                <Button sx={{color: '#1e88e5'}} component={Link} to={`/game-list/${game.id}`} >
                    More
                </Button>
            </ButtonGroup>
        </CardActions>
        </>
    )
}

export default GameCardActions