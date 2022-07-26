import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ButtonGroup from '@mui/material/ButtonGroup';
import ErrorMsg from "./ErrorMsg";

function GameCardActions({ game, gameObj, setDetailed = false }) {
    const [error, setError] = useState('')
    const [liked, setLiked] = useState(false)

    const likedIds = useContext(UserContext).likedIds
    const likedGames = useContext(UserContext).likedGames
    const setLikeList = useContext(UserContext).setLikes
    const setId = useContext(UserContext).setId

    useEffect(() => {
        likedIds[game.id] ? setLiked(true) : setLiked(false)
    }, [game, likedIds])

    const likeCounter = liked ? -1 : 1

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
            body: JSON.stringify({likes: game.likes + likeCounter})
        }
        fetch(`/games/${game.id}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(updatedGame => {
                        gameObj.setGames(gameObj.games.map(g => g.id === updatedGame.id ? updatedGame : g))
                        if (liked) {
                            setId({...likedIds, [updatedGame.id]: null})
                            setLikeList(likedGames.filter(g => g.id !== updatedGame.id))
                            setLiked(false)
                        } else {
                            setId({...likedIds, [updatedGame.id]: updatedGame.id})
                            setLikeList([...likedGames, updatedGame])
                            setLiked(true)
                        }
                        if (setDetailed) {
                            setDetailed({...game, likes: updatedGame.likes})
                        }
                    })
                } else {
                    r.json().then(({ error }) => handleError(error))
                }
            })
    }

    const likeBtn = liked ? <FavoriteIcon sx={{color: 'red'}} onClick={handleLikes} /> : <FavoriteBorderIcon sx={{color: 'red'}} onClick={handleLikes} />

    return (
        <>
        {error ? <ErrorMsg error={error} /> : null}
        <CardActions>
            <ButtonGroup variant="string" fullWidth>
                <Button startIcon={likeBtn} >
                    {game.likes}
                </Button>
                <Button startIcon={<StarOutlineIcon sx={{color: 'yellow'}} />} >
                    4.7
                </Button>
                <Button startIcon={<ChatBubbleOutlineIcon />} >
                    10
                </Button>
                {setDetailed ? null : <Button sx={{color: '#1e88e5'}} component={Link} to={`/game-list/${game.id}`}>More</Button>}
            </ButtonGroup>
        </CardActions>
        </>
    )
}

export default GameCardActions