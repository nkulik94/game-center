import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { GamesContext } from "../context/games";
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import ButtonGroup from '@mui/material/ButtonGroup';
import ErrorMsg from "./ErrorMsg";
import RateDialog from "./RateDialog";

function GameCardActions({ game, setDetailed = false }) {
    const [error, setError] = useState('')
    const [liked, setLiked] = useState(false)
    const [rated, setRated] = useState(false)
    const [open, setOpen] = useState(false)

    const likedIds = useContext(UserContext).likedIds
    const likedGames = useContext(UserContext).likedGames
    const setLikeList = useContext(UserContext).setLikes
    const setId = useContext(UserContext).setId
    const ratedIds = useContext(UserContext).ratedIds
    const rateList = useContext(UserContext).ratedGames
    const setRateList = useContext(UserContext).setRates

    const setGames = useContext(GamesContext).setGames
    const allGames = useContext(GamesContext).games

    useEffect(() => {
        likedIds[game.id] ? setLiked(true) : setLiked(false)
        ratedIds[game.id] ? setRated(true) : setRated(false)
    }, [game, likedIds, ratedIds])

    const likeCounter = liked ? -1 : 1

    function handleError(error) {
        setError(error)
        setTimeout(() => setError(''), 3000)
    }

    function updateListForLikes(game, updatedGame) {
        game.likes = game.id === updatedGame.id ? updatedGame.likes : game.likes
        return game
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
                        if (liked) {
                            setId({...likedIds, [updatedGame.id]: null})
                            setLikeList(likedGames.filter(g => g.id !== updatedGame.id))
                            setLiked(false)
                        } else {
                            setId({...likedIds, [updatedGame.id]: updatedGame.id})
                            setLikeList([...likedGames, updatedGame])
                            setLiked(true)
                        }
                        if (rated) {
                            setRateList(rateList.map(game => updateListForLikes(game, updatedGame)))
                        }
                        setGames(allGames.map(game => updateListForLikes(game, updatedGame)))
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

    function handleOpen() {
        setOpen(!open)
    }
    const rateBtn = rated ? <StarRateIcon onClick={handleOpen} sx={{color: 'yellow'}} /> : <StarOutlineIcon onClick={handleOpen} sx={{color: 'yellow'}} />

    return (
        <>
        {error ? <ErrorMsg error={error} /> : null}
        <CardActions>
            <ButtonGroup variant="string" fullWidth>
                <Button startIcon={likeBtn} >
                    {game.likes}
                </Button>
                <Button startIcon={rateBtn} >
                    {game.rating ? game.rating : 'N/A'}
                </Button>
                <Button startIcon={<ChatBubbleOutlineIcon />} >
                    10
                </Button>
                {setDetailed ? null : <Button sx={{color: '#1e88e5'}} component={Link} to={`/game-details/${game.id}`}>More</Button>}
            </ButtonGroup>
            <RateDialog
                rating={ratedIds[game.id] ? ratedIds[game.id] : 0}
                open={open}
                setOpen={setOpen}
                setDetailed={setDetailed}
                liked={liked}
            />
        </CardActions>
        </>
    )
}

export default GameCardActions