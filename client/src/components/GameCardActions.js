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
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function GameCardActions({ game, setDetailed = false }) {
    const [error, setError] = useState('')
    const [liked, setLiked] = useState(false)
    const [rated, setRated] = useState(false)
    const [reviewed, setReviewed] = useState(false)
    const [open, setOpen] = useState(false)

    const userContext = useContext(UserContext)

    const likedIds = userContext.likedIds
    const likedGames = userContext.likedGames
    const setLikeList = userContext.setLikes
    const setId = userContext.setId
    const ratedIds = userContext.ratedIds
    const rateList = userContext.ratedGames
    const setRateList = userContext.setRates
    const reviewIds = userContext.reviewIds

    const setGames = useContext(GamesContext).setGames
    const allGames = useContext(GamesContext).games

    useEffect(() => {
        likedIds[game.id] ? setLiked(true) : setLiked(false)
        ratedIds[game.id] ? setRated(true) : setRated(false)
        reviewIds[game.id] ? setReviewed(true) : setReviewed(false)
    }, [game, likedIds, ratedIds, reviewIds])

    const likeCounter = liked ? -1 : 1

    function handleError(error) {
        setError(error)
        setTimeout(() => setError(''), 3000)
    }

    function updateListForAttribute(game, updatedGame, attribute) {
        game[attribute] = game.id === updatedGame.id ? updatedGame[attribute] : game[attribute]
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
                            setRateList(rateList.map(game => updateListForAttribute(game, updatedGame, 'likes')))
                        }
                        setGames(allGames.map(game => updateListForAttribute(game, updatedGame, 'likes')))
                        if (setDetailed) {
                            setDetailed('likes', updatedGame.likes)
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

    const reviewBtn = reviewed ? <ChatBubbleIcon /> : <ChatBubbleOutlineIcon />

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
                <Button startIcon={reviewBtn} >
                    {setDetailed ? game.reviews.length : game.review_count}
                </Button>
                {setDetailed ? null : <Button sx={{color: '#1e88e5'}} component={Link} to={`/game-details/${game.id}`}>More</Button>}
            </ButtonGroup>
            <RateDialog
                gameId={game.id}
                open={open}
                setOpen={setOpen}
                setDetailed={setDetailed}
                liked={liked}
                updateLists={updateListForAttribute}
            />
        </CardActions>
        </>
    )
}

export default GameCardActions