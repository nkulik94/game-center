import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function BioEdit({ bio, setBio, id }) {
    const [open, setOpen] = useState(false)
    const [bioForm, setBioForm] = useState(bio)

    const handleForm = () => setOpen(!open)

    function handleEdit() {
        const config = {
            method: 'PATCH',
            headers: {
                "COntent-Type": "application/json"
            },
            body: JSON.stringify({bio: bioForm})
        }
        fetch(`/users/${id}`, config)
        .then(r => {
            if (r.ok) {
                r.json().then(data => {
                    setBio(data.bio)
                    handleForm()
                })
            }
        })
    }

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
            onChange={e => setBioForm(e.target.value)}
          />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEdit} >Save</Button>
                <Button
                color='error'
                onClick={() => {
                    handleForm()
                    setBioForm(bio)
                }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default BioEdit