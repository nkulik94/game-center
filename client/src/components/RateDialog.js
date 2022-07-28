import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import { GamesContext } from "../context/games";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import RateStarBtn from "./RateStarBtn";
import Button from '@mui/material/Button';
import ErrorMsg from "./ErrorMsg";

function RateDialog({ gameId, open, setOpen, setDetailed, liked, updateLists }) {
    const [currentRating, setCurrentRating] = useState(0)
    const [error, setError] = useState(false)
    const indexes = [1, 2, 3, 4, 5]
    const gameContext = useContext(GamesContext)
    const userContext = useContext(UserContext)
    const ratingObj = userContext.ratedIds[gameId]
    const rating = ratingObj ? ratingObj.rating : 0
    const ratedGameList = userContext.ratedGames
    const likeList = userContext.likedGames


    useEffect(() => {
        setCurrentRating(rating)
    }, [rating])

    function handleCurrentRating(index) {
        setCurrentRating(index)
    }

    function handleError(error) {
        setError(error)
        setTimeout(() => setError(false), 3000)
    }

    function handleCancel() {
        setOpen(false)
        setCurrentRating(ratingObj ? ratingObj.rating : 0)
    }

    function handleLists(updatedGame) {
        gameContext.setGames(gameContext.games.map(game => updateLists(game, updatedGame, 'rating')))
        if (liked) {
            userContext.setLikes(likeList.map(game => updateLists(game, updatedGame, 'rating')))
        }
        if (setDetailed) {
            setDetailed('rating', updatedGame.rating)
        }
    }

    function handleNewRating() {
        const method = rating ? 'PATCH' : 'POST'
        const url = rating ? `/ratings/${ratingObj.id}` : '/ratings'
        const config = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({rating: currentRating, game_id: gameId})
        }
        fetch(url, config)
        .then(r => {
            if (r.ok) {
                setOpen(false)
                r.json().then(updatedRating => {
                    const rateListGame = {...updatedRating.game, rating: updatedRating.rating}
                    if (rating) {
                        userContext.setRates(ratedGameList.map(game => game.id === rateListGame.id ? rateListGame : game))
                    } else {
                        userContext.setRates([...ratedGameList, rateListGame])
                    }
                    userContext.ratedIds[gameId] = {rating: updatedRating.rating, id: updatedRating.id}
                    userContext.setRateId({...userContext.ratedIds})
                    handleLists(updatedRating.game)
                })
            } else {
                r.json().then(({ errors }) => handleError(errors[0]))
            }
        })
    }

    function handleDelete() {
        setOpen(false)
        const id = ratingObj.id
        fetch(`/ratings/${id}`, {method: 'DELETE'})
            .then(r => r.json())
            .then(updatedGame => {
                userContext.setRates(ratedGameList.filter(game => game.id !== updatedGame.id))
                delete userContext.ratedIds[gameId]
                userContext.setRateId({...userContext.ratedIds})
                handleLists(updatedGame)
            })
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} >
            <DialogContent>
                <ButtonGroup>
                    {indexes.map(index => <RateStarBtn key={index} filled={index <= currentRating} index={index} handleRating={handleCurrentRating} />)}
                </ButtonGroup>
                <br/>
                {error ? <ErrorMsg error={error} /> : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleNewRating}>Save</Button>
                <Button onClick={handleCancel} >Cancel</Button>
                {rating ? <Button color="error" onClick={handleDelete} >Delete</Button> : null}
            </DialogActions>
        </Dialog>
    )
}

export default RateDialog