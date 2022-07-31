import React, { useState, useContext } from 'react';
import { GamesContext } from '../context/games';
import { UserContext } from '../context/user';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ReviewDialog({ open, setOpen, gameId, setDetailed = false }) {
    const userContext = useContext(UserContext)
    const gameContext = useContext(GamesContext)
    const review = userContext.reviewIds[gameId]
    const [reviewForm, setForm] = useState(review ? review.content : '')

    function handleCancel() {
        setOpen(false)
        setForm(review ? review.content : '')
    }

    function handleChangeReviewCount(list, num) {
        return list.map(game => {
            game.review_count = game.id === gameId ? game.review_count + num : game.review_count
            return game
        })
    }

    function handleDelete() {
        const id = review.id
        fetch(`/reviews/${id}`, {method: 'DELETE'})
        .then(r => {
            if (r.ok) {
                setOpen(false)
                setForm('')
                const idsObj = userContext.reviewIds
                delete idsObj[gameId]
                userContext.setReviewId({...idsObj})
                gameContext.setGames(handleChangeReviewCount(gameContext.games, -1))
                userContext.setRates(handleChangeReviewCount(gameContext.games, -1))
                if (userContext.likedIds[gameId]) {
                    userContext.setLikes(handleChangeReviewCount(gameContext.games, -1))
                }
                if (setDetailed) {
                    setDetailed('review-list', id, 'delete')
                }
            }
        })
    }

    function handleSave() {
        const method = review ? 'PATCH' : 'POST'
        const url = review ? `/reviews/${review.id}` : '/reviews'
        const config = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({game_id: gameId, content: reviewForm})
        }
        fetch(url, config)
            .then(r => {
                if (r.ok) {
                    setOpen(false)
                    r.json().then(review => {
                        const idsObj = userContext.reviewIds
                        idsObj[gameId] = review
                        userContext.setReviewId({...idsObj})
                        if (method === 'PATCH' && setDetailed) {
                            setDetailed('review-list', review, 'update')
                        } else if (method === 'POST') {
                            gameContext.setGames(handleChangeReviewCount(gameContext.games, 1))
                            userContext.setRates(handleChangeReviewCount(gameContext.games, 1))
                            if (userContext.likedIds[gameId]) {
                                userContext.setLikes(handleChangeReviewCount(gameContext.games, 1))
                            }
                            if (setDetailed) {
                                setDetailed('review-list', review, 'add')
                            }
                        }
                    })
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
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel} >Cancel</Button>
                {review ? <Button onClick={handleDelete} color='error'>Delete Review</Button> : null}
            </DialogActions>
        </Dialog>
    )
}

export default ReviewDialog