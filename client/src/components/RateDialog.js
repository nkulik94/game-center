import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import { GamesContext } from "../context/games";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import RateStarBtn from "./RateStarBtn";
import Button from '@mui/material/Button';

function RateDialog({ gameId, open, setOpen, setDetailed, liked, updateLists }) {
    const [currentRating, setCurrentRating] = useState(0)
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

    function handleCancel() {
        setOpen(false)
        setCurrentRating(ratingObj ? ratingObj.rating : 0)
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
                gameContext.setGames(gameContext.games.map(game => updateLists(game, updatedGame, 'rating')))
                if (liked) {
                    userContext.setLikes(likeList.map(game => updateLists(game, updatedGame, 'rating')))
                }
                if (setDetailed) {
                    setDetailed('rating', updatedGame.rating)
                }
            })
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} >
            <DialogContent>
                <ButtonGroup>
                    {indexes.map(index => <RateStarBtn key={index} filled={index <= currentRating} index={index} handleRating={handleCurrentRating} />)}
                </ButtonGroup>
            </DialogContent>
            <DialogActions>
                <Button>Save</Button>
                <Button onClick={handleCancel} >Cancel</Button>
                {rating ? <Button color="error" onClick={handleDelete} >Delete</Button> : null}
            </DialogActions>
        </Dialog>
    )
}

export default RateDialog