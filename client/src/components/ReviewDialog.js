import React, { useState, useContext } from 'react';
import { GamesContext } from '../context/games';
import { UserContext } from '../context/user';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ReviewDialog({ open, setOpen, gameId, setDetailed = false, reviewList }) {
    const userContext = useContext(UserContext)
    const gameContext = useContext(GamesContext)
    const review = userContext.reviewIds[gameId]
    const [reviewForm, setForm] = useState(review ? review.content : '')

    function handleCancel() {
        setOpen(false)
        setForm(review ? review.content : '')
    }

    function handleDelete() {
        const id = review.id
        setOpen(false)
        fetch(`/reviews/${id}`, {method: 'DELETE'})
        .then(r => {
            if (r.ok) {
                const idsObj = userContext.reviewIds
                delete idsObj[gameId]
                userContext.setReviewId({...idsObj})
                function handleLessReview(list) {
                    return list.map(game => {
                        game.review_count = game.id === gameId ? game.review_count - 1 : game.review_count
                        return game
                    })
                }
                gameContext.setGames(handleLessReview(gameContext.games))
                userContext.setRates(handleLessReview(userContext.ratedGames))
                if (userContext.likedIds[gameId]) {
                    userContext.setLikes(handleLessReview(userContext.likedGames))
                }
                if (setDetailed) {
                    setDetailed('review-list', id)
                }
            }
        })
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Review</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                id="review-form"
                label="Review"
                type="textarea"
                fullWidth
                variant="outlined"
                multiline
                value={reviewForm}
                onChange={e => setForm(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button>Save</Button>
                <Button onClick={handleCancel} >Cancel</Button>
                {review ? <Button onClick={handleDelete}>Delete Review</Button> : null}
            </DialogActions>
        </Dialog>
    )
}

export default ReviewDialog