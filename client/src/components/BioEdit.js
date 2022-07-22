import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function BioEdit({ bio }) {
    const [open, setOpen] = useState(false)
    const [bioForm, setBio] = useState(bio)

    const handleForm = () => setOpen(!open)

    return (
        <>
        <Button variant='text' onClick={handleForm} >Edit</Button>
        <Dialog open={open} onClose={handleForm} >
            <DialogTitle>Edit</DialogTitle>
            <DialogContent >
            <TextField
            autoFocus
            id="bio-form"
            label="Edit Bio"
            type="textarea"
            fullWidth
            variant="outlined"
            multiline
            value={bioForm}
            onChange={e => setBio(e.target.value)}
          />
            </DialogContent>
            <DialogActions>
                <Button>Save</Button>
                <Button color='error'>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default BioEdit