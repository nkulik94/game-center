import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import RateStarBtn from "./RateStarBtn";
import Button from '@mui/material/Button';

function RateDialog({ rating, open, setOpen, setDetailed, liked }) {
    const [currentRating, setCurrentRating] = useState(rating ? rating.rating : 0)
    const indexes = [1, 2, 3, 4, 5]

    function handleCurrentRating(index) {
        setCurrentRating(index)
    }

    function handleCancel() {
        setOpen(false)
        setCurrentRating(rating ? rating.rating : 0)
    }

    function handleDelete() {
        
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
                {rating ? <Button>Delete</Button> : null}
            </DialogActions>
        </Dialog>
    )
}

export default RateDialog